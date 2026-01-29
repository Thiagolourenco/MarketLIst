-- ============================================
-- MIGRAÇÃO: User Profiles e Sincronização de Nome
-- ============================================
-- Este arquivo cria a tabela user_profiles e sincroniza
-- automaticamente o nome do user_metadata quando um usuário se registra

-- 1. Criar tabela de perfis de usuário (se não existir)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  name TEXT, -- Nome curto (mesmo que full_name por enquanto)
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS para user_profiles
-- Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Usuários podem inserir apenas seu próprio perfil
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Função para criar perfil automaticamente quando usuário se registra
-- Esta função sincroniza o nome do user_metadata para user_profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id,
    full_name,
    name,
    avatar_url
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name'
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name'
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(
      EXCLUDED.full_name,
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name'
    ),
    name = COALESCE(
      EXCLUDED.name,
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name'
    ),
    avatar_url = COALESCE(
      EXCLUDED.avatar_url,
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger para executar a função quando um novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 8. Função para sincronizar atualizações do user_metadata para user_profiles
CREATE OR REPLACE FUNCTION public.sync_user_metadata_to_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza user_profiles quando user_metadata é modificado
  UPDATE public.user_profiles
  SET
    full_name = COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      full_name
    ),
    name = COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      name
    ),
    avatar_url = COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture',
      avatar_url
    ),
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Trigger para sincronizar quando user_metadata é atualizado
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data IS DISTINCT FROM NEW.raw_user_meta_data)
  EXECUTE FUNCTION public.sync_user_metadata_to_profile();

-- 10. Índice para performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON public.user_profiles(id);

-- ============================================
-- QUERIES ÚTEIS PARA CONSULTA
-- ============================================

-- Ver todos os usuários com seus nomes do user_metadata
-- SELECT 
--   id,
--   email,
--   raw_user_meta_data->>'name' as name,
--   raw_user_meta_data->>'full_name' as full_name,
--   created_at
-- FROM auth.users
-- ORDER BY created_at DESC;

-- Ver todos os perfis de usuário
-- SELECT 
--   id,
--   full_name,
--   name,
--   avatar_url,
--   subscription_status,
--   created_at,
--   updated_at
-- FROM public.user_profiles
-- ORDER BY created_at DESC;

-- Ver usuários sem nome (para atualizar manualmente)
-- SELECT 
--   u.id,
--   u.email,
--   u.raw_user_meta_data,
--   p.full_name as profile_name
-- FROM auth.users u
-- LEFT JOIN public.user_profiles p ON u.id = p.id
-- WHERE (u.raw_user_meta_data->>'name' IS NULL 
--   AND u.raw_user_meta_data->>'full_name' IS NULL)
--   OR p.full_name IS NULL;

-- ============================================
-- QUERY PARA ATUALIZAR USUÁRIOS EXISTENTES
-- ============================================
-- Execute esta query se você já tem usuários cadastrados
-- e quer sincronizar seus dados para user_profiles

-- INSERT INTO public.user_profiles (id, full_name, name, avatar_url)
-- SELECT 
--   u.id,
--   COALESCE(
--     u.raw_user_meta_data->>'full_name',
--     u.raw_user_meta_data->>'name',
--     SPLIT_PART(u.email, '@', 1) -- Fallback para parte antes do @
--   ) as full_name,
--   COALESCE(
--     u.raw_user_meta_data->>'name',
--     u.raw_user_meta_data->>'full_name',
--     SPLIT_PART(u.email, '@', 1)
--   ) as name,
--   COALESCE(
--     u.raw_user_meta_data->>'avatar_url',
--     u.raw_user_meta_data->>'picture'
--   ) as avatar_url
-- FROM auth.users u
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.user_profiles p WHERE p.id = u.id
-- )
-- ON CONFLICT (id) DO NOTHING;
