# Queries SQL para Supabase - User Profiles e Nome

Este arquivo contém todas as queries SQL necessárias para configurar o sistema de perfis de usuário no Supabase.

## 📋 Índice

1. [Migração Completa](#1-migração-completa)
2. [Queries de Consulta](#2-queries-de-consulta)
3. [Queries de Atualização](#3-queries-de-atualização)
4. [Troubleshooting](#4-troubleshooting)

---

## 1. Migração Completa

Execute o arquivo completo em: `supabase/migrations/001_user_profiles.sql`

Ou copie e cole no **SQL Editor** do Supabase Dashboard:

```sql
-- Criar tabela user_profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Função para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    name = COALESCE(EXCLUDED.name, NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
    avatar_url = COALESCE(EXCLUDED.avatar_url, NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para novos usuários
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Função para sincronizar atualizações
CREATE OR REPLACE FUNCTION public.sync_user_metadata_to_profile()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_profiles
  SET
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', full_name),
    name = COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', name),
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', avatar_url),
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizações
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data IS DISTINCT FROM NEW.raw_user_meta_data)
  EXECUTE FUNCTION public.sync_user_metadata_to_profile();
```

---

## 2. Queries de Consulta

### Ver todos os usuários com nomes

```sql
SELECT
  id,
  email,
  raw_user_meta_data->>'name' as name,
  raw_user_meta_data->>'full_name' as full_name,
  created_at
FROM auth.users
ORDER BY created_at DESC;
```

### Ver todos os perfis

```sql
SELECT
  id,
  full_name,
  name,
  avatar_url,
  subscription_status,
  created_at,
  updated_at
FROM public.user_profiles
ORDER BY created_at DESC;
```

### Ver usuário específico com perfil

```sql
SELECT
  u.id,
  u.email,
  u.raw_user_meta_data->>'name' as metadata_name,
  u.raw_user_meta_data->>'full_name' as metadata_full_name,
  p.full_name as profile_full_name,
  p.name as profile_name,
  p.avatar_url
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE u.id = 'USER_ID_AQUI';
```

---

## 3. Queries de Atualização

### Sincronizar usuários existentes para user_profiles

**⚠️ Execute apenas uma vez após criar a tabela**

```sql
INSERT INTO public.user_profiles (id, full_name, name, avatar_url)
SELECT
  u.id,
  COALESCE(
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    SPLIT_PART(u.email, '@', 1)
  ) as full_name,
  COALESCE(
    u.raw_user_meta_data->>'name',
    u.raw_user_meta_data->>'full_name',
    SPLIT_PART(u.email, '@', 1)
  ) as name,
  COALESCE(
    u.raw_user_meta_data->>'avatar_url',
    u.raw_user_meta_data->>'picture'
  ) as avatar_url
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;
```

### Atualizar nome de um usuário específico

```sql
-- Atualizar no user_metadata (será sincronizado automaticamente)
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{name}',
  '"Novo Nome"'
)
WHERE id = 'USER_ID_AQUI';

-- Ou atualizar diretamente no user_profiles
UPDATE public.user_profiles
SET
  full_name = 'Novo Nome',
  name = 'Novo Nome',
  updated_at = NOW()
WHERE id = 'USER_ID_AQUI';
```

### Encontrar usuários sem nome

```sql
SELECT
  u.id,
  u.email,
  u.raw_user_meta_data,
  p.full_name as profile_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE (u.raw_user_meta_data->>'name' IS NULL
  AND u.raw_user_meta_data->>'full_name' IS NULL)
  OR p.full_name IS NULL;
```

---

## 4. Troubleshooting

### Verificar se os triggers estão funcionando

```sql
-- Ver triggers ativos
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  OR event_object_schema = 'auth';
```

### Recriar triggers (se necessário)

```sql
-- Remover triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Recriar (execute a migração completa novamente)
```

### Verificar políticas RLS

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'user_profiles';
```

### Testar RLS

```sql
-- Como usuário autenticado, verificar se consegue ver seu próprio perfil
SELECT * FROM public.user_profiles WHERE id = auth.uid();

-- Verificar se não consegue ver perfis de outros usuários
SELECT COUNT(*) FROM public.user_profiles;
-- Deve retornar apenas 1 (seu próprio perfil)
```

---

## 📝 Notas Importantes

1. **Row Level Security (RLS)**: As políticas garantem que usuários só vejam/editem seus próprios perfis
2. **Triggers Automáticos**:
   - Quando um novo usuário se registra → perfil é criado automaticamente
   - Quando `user_metadata` é atualizado → `user_profiles` é sincronizado automaticamente
3. **Compatibilidade**: O código do app busca nome em `user_metadata.name` ou `user_metadata.full_name`, que são sincronizados para `user_profiles`
4. **Fallback**: Se não houver nome, o app usa a parte antes do `@` do email

---

## 🚀 Próximos Passos

Após executar a migração:

1. ✅ Teste criar um novo usuário e verificar se o perfil é criado automaticamente
2. ✅ Verifique se o nome aparece no `HomeHeader` do app
3. ✅ Teste atualizar o nome via app e verificar sincronização
4. ✅ Execute a query de sincronização para usuários existentes (se houver)
