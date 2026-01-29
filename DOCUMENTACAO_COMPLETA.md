# Documentação Completa - ListByMarket

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Features Principais](#features-principais)
5. [Modelos de Dados](#modelos-de-dados)
6. [Rotas e Navegação](#rotas-e-navegação)
7. [Autenticação](#autenticação)
8. [Integrações](#integrações)
9. [Design System](#design-system)
10. [APIs e Repositórios](#apis-e-repositórios)
11. [View Models](#view-models)
12. [Componentes Principais](#componentes-principais)
13. [Configurações](#configurações)
14. [Próximos Passos para Backend](#próximos-passos-para-backend)

---

## Visão Geral

**ListByMarket** é um aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de listas de compras, planejamento de refeições semanais e receitas. O app permite aos usuários criar listas de compras organizadas por categorias, gerar planos de refeições semanais com IA, visualizar receitas detalhadas e gerenciar assinaturas premium.

### Tecnologias Principais

- **Framework**: React Native com Expo (~54.0.25)
- **Navegação**: Expo Router (~6.0.15)
- **Backend**: Supabase (autenticação e banco de dados)
- **Estado**: Zustand (^5.0.8)
- **Animações**: React Native Reanimated (~4.1.1)
- **Gestos**: React Native Gesture Handler (~2.28.0)
- **TypeScript**: ~5.9.2

---

## Arquitetura

O projeto segue uma arquitetura **Feature-Based** com separação clara de responsabilidades:

```
src/
├── core/           # Funcionalidades compartilhadas
├── features/       # Features do app (auth, lists, meal-plans, etc.)
├── shared/         # Componentes e utilitários compartilhados
```

### Padrão de Organização por Feature

Cada feature segue a estrutura:
```
feature-name/
├── domain/         # Entidades e lógica de negócio
├── data/           # Repositórios e mappers (acesso a dados)
├── view/           # Componentes de UI
├── view-model/     # Lógica de apresentação (hooks)
```

---

## Estrutura de Pastas

```
ListByMarket/
├── app/                    # Rotas do Expo Router
│   ├── (app)/             # Rotas autenticadas
│   │   ├── home/          # Tela inicial
│   │   ├── list/          # Listas de compras
│   │   ├── week/          # Planos semanais
│   │   ├── recipe/        # Receitas
│   │   ├── paywall/       # Tela de assinatura
│   │   └── settings/      # Configurações
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── onboarding.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── forgot-password.tsx
│   └── modal/             # Modais
│
├── src/
│   ├── core/              # Core do app
│   │   ├── hooks/         # useSession, useRequireAuth
│   │   ├── lib/           # Supabase, env, constants
│   │   ├── navigation/    # Guards e redirects
│   │   ├── theme/         # Cores, tipografia, espaçamento
│   │   ├── types/         # Tipos TypeScript (db.ts)
│   │   └── ui/            # Design system base
│   │
│   ├── features/          # Features do app
│   │   ├── auth/          # Autenticação
│   │   ├── lists/         # Listas de compras
│   │   ├── meal-plans/    # Planos de refeições
│   │   ├── recipes/       # Receitas
│   │   ├── subscriptions/ # Assinaturas
│   │   └── profile/       # Perfil do usuário
│   │
│   └── shared/            # Componentes compartilhados
│       ├── components/    # GroceryListCard, MealCard, etc.
│       └── utils/          # Utilitários
│
└── supabase/              # Configurações Supabase
    ├── functions/
    └── migrations/
```

---

## Features Principais

### 1. Autenticação (`features/auth/`)

**Funcionalidades:**
- Onboarding para novos usuários
- Login com email/senha
- Cadastro de novos usuários
- Recuperação de senha
- Logout

**Arquivos Principais:**
- `view/OnboardingView.tsx` - Tela de onboarding
- `view/SignInView.tsx` - Tela de login
- `view/SignUpView.tsx` - Tela de cadastro
- `view-model/useAuthVM.ts` - Lógica de autenticação

**Rotas:**
- `/(auth)/onboarding`
- `/(auth)/sign-in`
- `/(auth)/sign-up`
- `/(auth)/forgot-password`

---

### 2. Listas de Compras (`features/lists/`)

**Funcionalidades:**
- Visualizar todas as listas de compras
- Criar nova lista de compras
- Visualizar detalhes de uma lista
- Adicionar/remover itens da lista
- Marcar itens como comprados
- Organizar itens por categorias
- Gerar lista a partir de plano de refeições

**Entidades:**
- `GroceryList` - Lista de compras
- `GroceryItem` - Item da lista

**Arquivos Principais:**
- `view/HomeScreenView.tsx` - Tela inicial com listas
- `view/ListsScreenView.tsx` - Tela de todas as listas
- `view/ListDetailsView.tsx` - Detalhes de uma lista
- `view/CreateListView.tsx` - Criar nova lista
- `view-model/useHomeVM.ts` - Lógica da home
- `view-model/useListDetailsVM.ts` - Lógica de detalhes
- `view-model/useCreateListVM.ts` - Lógica de criação
- `data/ListsRepository.ts` - Acesso aos dados

**Componentes:**
- `HomeHeader.tsx` - Cabeçalho da home
- `GroceryListsSection.tsx` - Seção de listas
- `CreateListBottomSheet.tsx` - Modal de criação
- `ListHeader.tsx` - Cabeçalho da lista
- `CategorySection.tsx` - Seção por categoria
- `ShoppingListItem.tsx` - Item da lista
- `AddItemButton.tsx` - Botão adicionar item
- `GenerateMealPlanButton.tsx` - Botão gerar plano

**Rotas:**
- `/(app)/home` - Home com listas
- `/(app)/list` - Todas as listas
- `/(app)/list/[listId]` - Detalhes da lista
- `/(app)/list/create` - Criar lista
- `/modal/create-list` - Modal de criação

---

### 3. Planos de Refeições (`features/meal-plans/`)

**Funcionalidades:**
- Visualizar plano semanal de refeições
- Gerar novo plano de refeições com IA
- Visualizar refeições do dia
- Navegar entre dias da semana
- Ver refeições futuras

**Entidades:**
- `WeekPlan` - Plano semanal
- `PlanMeal` - Refeição do plano

**Arquivos Principais:**
- `view/WeekPlanView.tsx` - Visualização do plano
- `view/GeneratePlanView.tsx` - Geração de plano
- `view-model/useWeekPlanVM.ts` - Lógica do plano
- `view-model/useGeneratePlanVM.ts` - Lógica de geração
- `data/MealPlansRepository.ts` - Acesso aos dados

**Componentes:**
- `TodayMealCard.tsx` - Card de refeição do dia
- `UpcomingMealItem.tsx` - Item de refeição futura

**Rotas:**
- `/(app)/week` - Lista de planos
- `/(app)/week/[weekId]` - Detalhes do plano
- `/(app)/week/generate` - Gerar novo plano

---

### 4. Receitas (`features/recipes/`)

**Funcionalidades:**
- Visualizar receita detalhada
- Ver ingredientes e instruções
- Ver tempo de preparo e cozimento
- Ver porções e calorias
- Dicas do chef IA
- Favoritar receitas

**Entidades:**
- `Recipe` - Receita
- `RecipeIngredient` - Ingrediente da receita

**Arquivos Principais:**
- `view/RecipeDetailsView.tsx` - Detalhes da receita
- `view-model/useRecipeVM.ts` - Lógica da receita
- `data/RecipesRepository.ts` - Acesso aos dados

**Rotas:**
- `/(app)/recipe/[recipeId]` - Detalhes da receita

---

### 5. Assinaturas (`features/subscriptions/`)

**Funcionalidades:**
- Visualizar paywall (tela de assinatura)
- Escolher plano (anual/mensal)
- Gerenciar assinatura
- Ver status da assinatura

**Arquivos Principais:**
- `view/PaywallView.tsx` - Tela de assinatura
- `view/SubscriptionView.tsx` - Gerenciar assinatura
- `components/PlanCard.tsx` - Card de plano

**Rotas:**
- `/(app)/paywall` - Paywall
- `/(app)/settings/subscription` - Gerenciar assinatura

**Planos:**
- **Anual**: R$ 89,99/ano (economia de 50%)
- **Mensal**: R$ 9,99/mês
- **Trial**: 7 dias grátis

**Features Premium:**
- Unlimited AI Meal Plans
- Advanced Recipe Filters
- Scan Ingredients from Your Pantry
- Save Favorite Recipes

---

### 6. Perfil (`features/profile/`)

**Funcionalidades:**
- Visualizar perfil do usuário
- Editar perfil
- Gerenciar preferências alimentares
- Ver histórico de refeições
- Configurar notificações
- Gerenciar assinatura

**Arquivos Principais:**
- `view/ProfileView.tsx` - Tela de perfil/configurações

**Rotas:**
- `/(app)/settings` - Configurações
- `/(app)/settings/preferences` - Preferências
- `/(app)/settings/subscription` - Assinatura

---

## Modelos de Dados

### GroceryList (Lista de Compras)

```typescript
interface GroceryList {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Tabela Supabase:** `grocery_lists`
- `id` (uuid, PK)
- `name` (text)
- `user_id` (uuid, FK -> users)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

### GroceryItem (Item da Lista)

```typescript
interface GroceryItem {
  id: string;
  listId: string;
  name: string;
  quantity?: number;
  unit?: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Tabela Supabase:** `grocery_items` (a ser criada)
- `id` (uuid, PK)
- `list_id` (uuid, FK -> grocery_lists)
- `name` (text)
- `quantity` (numeric, nullable)
- `unit` (text, nullable)
- `checked` (boolean, default: false)
- `category` (text, nullable) - Ex: "PRODUCE", "DAIRY & EGGS"
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

### WeekPlan (Plano Semanal)

```typescript
interface WeekPlan {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  meals: PlanMeal[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Tabela Supabase:** `week_plans` (a ser criada)
- `id` (uuid, PK)
- `user_id` (uuid, FK -> users)
- `start_date` (date)
- `end_date` (date)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

### PlanMeal (Refeição do Plano)

```typescript
interface PlanMeal {
  id: string;
  planId: string;
  recipeId: string;
  day: number; // 0-6 (Sunday-Saturday)
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  createdAt: Date;
}
```

**Tabela Supabase:** `plan_meals` (a ser criada)
- `id` (uuid, PK)
- `plan_id` (uuid, FK -> week_plans)
- `recipe_id` (uuid, FK -> recipes)
- `day` (integer, 0-6)
- `meal_type` (enum: 'breakfast', 'lunch', 'dinner', 'snack')
- `created_at` (timestamp)

---

### Recipe (Receita)

```typescript
interface Recipe {
  id: string;
  name: string;
  description?: string;
  instructions: string[];
  ingredients: RecipeIngredient[];
  prepTime?: number; // em minutos
  cookTime?: number; // em minutos
  servings?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RecipeIngredient {
  name: string;
  quantity?: number;
  unit?: string;
}
```

**Tabela Supabase:** `recipes` (a ser criada)
- `id` (uuid, PK)
- `name` (text)
- `description` (text, nullable)
- `instructions` (jsonb) - Array de strings
- `ingredients` (jsonb) - Array de RecipeIngredient
- `prep_time` (integer, nullable) - minutos
- `cook_time` (integer, nullable) - minutos
- `servings` (integer, nullable)
- `image_url` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Tabela Relacional (Alternativa):** `recipe_ingredients`
- `id` (uuid, PK)
- `recipe_id` (uuid, FK -> recipes)
- `name` (text)
- `quantity` (numeric, nullable)
- `unit` (text, nullable)
- `order` (integer) - Ordem de exibição

---

### User (Usuário)

**Tabela Supabase:** `users` (gerenciada pelo Supabase Auth)
- `id` (uuid, PK) - Do Supabase Auth
- `email` (text)
- Campos adicionais podem ser adicionados em `user_profiles`:
  - `full_name` (text, nullable)
  - `avatar_url` (text, nullable)
  - `preferences` (jsonb, nullable) - Preferências alimentares
  - `subscription_status` (text) - 'free', 'trial', 'active', 'cancelled'
  - `subscription_plan` (text, nullable) - 'monthly', 'annual'
  - `subscription_expires_at` (timestamp, nullable)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

---

## Rotas e Navegação

### Estrutura de Rotas

O app usa **Expo Router** com file-based routing:

```
app/
├── _layout.tsx              # Layout raiz
├── index.tsx                # Rota inicial (redireciona)
├── (auth)/                  # Grupo de autenticação
│   ├── _layout.tsx
│   ├── onboarding.tsx
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   └── forgot-password.tsx
├── (app)/                   # Grupo autenticado
│   ├── _layout.tsx
│   ├── home/
│   │   └── index.tsx
│   ├── list/
│   │   ├── index.tsx
│   │   ├── [listId].tsx
│   │   └── create.tsx
│   ├── week/
│   │   ├── index.tsx
│   │   ├── [weekId].tsx
│   │   └── generate.tsx
│   ├── recipe/
│   │   └── [recipeId].tsx
│   ├── paywall/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   └── settings/
│       ├── index.tsx
│       ├── preferences.tsx
│       └── subscription.tsx
└── modal/
    ├── _layout.tsx
    └── create-list.tsx
```

### Navegação por Tabs

O app possui uma **Bottom Tab Bar** com 4 abas:

1. **Home** (`/(app)/home`) - Tela inicial
2. **List** (`/(app)/list`) - Todas as listas
3. **Calendar** (`/(app)/week`) - Planos semanais
4. **Profile** (`/(app)/settings`) - Configurações

A tab bar é controlada por `AppScreenWrapper` e `BottomTabBar`.

### Guards de Navegação

- `useRequireAuth` - Redireciona para login se não autenticado
- `guards.ts` - Lógica de proteção de rotas
- `redirects.ts` - Funções de redirecionamento

---

## Autenticação

### Implementação

O app usa **Supabase Auth** para autenticação:

- **Login**: Email e senha
- **Cadastro**: Email e senha
- **Sessão**: Gerenciada pelo Supabase
- **Hook**: `useSession()` - Monitora estado da sessão

### Fluxo de Autenticação

1. **Onboarding** → Primeira vez no app
2. **Sign In/Sign Up** → Autenticação
3. **App** → Rotas protegidas após login
4. **Logout** → Volta para tela de login

### Arquivos

- `src/core/lib/supabase.ts` - Cliente Supabase
- `src/core/hooks/useSession.ts` - Hook de sessão
- `src/core/hooks/useRequireAuth.ts` - Hook de proteção
- `src/features/auth/view-model/useAuthVM.ts` - View Model de auth

---

## Integrações

### Supabase

**Configuração:**
- URL e chave anônima via variáveis de ambiente
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

**Uso:**
- Autenticação de usuários
- Banco de dados PostgreSQL
- Real-time subscriptions (futuro)

**Arquivos:**
- `src/core/lib/supabase.ts` - Cliente
- `src/core/lib/env.ts` - Variáveis de ambiente

---

## Design System

### Cores (`src/core/theme/colors.ts`)

```typescript
{
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
}
```

### Tipografia (`src/core/theme/typography.ts`)

- **h1**: 32px, bold (700)
- **h2**: 24px, semibold (600)
- **h3**: 20px, semibold (600)
- **body**: 16px, regular (400)
- **bodyBold**: 16px, semibold (600)
- **caption**: 14px, regular (400)
- **captionBold**: 14px, semibold (600)

### Componentes Base (`src/core/ui/`)

- `Button` - Botões com variantes
- `Input` - Campos de texto
- `Card` - Cards
- `Badge` - Badges
- `Typography` - Texto tipado
- `BottomSheet` - Bottom sheets
- `FABButton` - Floating Action Button
- `Switch` - Toggle switch
- `Indicator` - Loading indicator

### Ícones (`src/core/ui/icons/`)

Todos os ícones são componentes SVG customizados:
- `HomeIcon`, `ListIcon`, `CalendarIcon`, `ProfileIcon`
- `AddIcon`, `CheckIcon`, `BackArrowIcon`
- `ChefHatIcon`, `FireIcon`, `StarIcon`
- E muitos outros...

---

## APIs e Repositórios

### ListsRepository

**Localização:** `src/features/lists/data/ListsRepository.ts`

**Métodos:**
- `getAll()` - Busca todas as listas do usuário
- `getById(id)` - Busca lista por ID
- `create(list)` - Cria nova lista
- `update(id, updates)` - Atualiza lista
- `delete(id)` - Deleta lista

**Tabela:** `grocery_lists`

---

### MealPlansRepository

**Localização:** `src/features/meal-plans/data/MealPlansRepository.ts`

**Métodos:**
- `getById(id)` - Busca plano por ID
- `generate(preferences)` - Gera novo plano (com IA)

**Tabelas:** `week_plans`, `plan_meals`

---

### RecipesRepository

**Localização:** `src/features/recipes/data/RecipesRepository.ts`

**Métodos:**
- `getById(id)` - Busca receita por ID
- `getAll()` - Busca todas as receitas

**Tabela:** `recipes`

---

## View Models

View Models são hooks que gerenciam a lógica de apresentação:

### useHomeVM
- Gerencia estado das listas na home
- Carrega listas do repositório
- Estado: `lists`, `isLoading`, `error`

### useListDetailsVM
- Gerencia detalhes de uma lista
- Carrega lista e itens
- Atualiza lista
- Estado: `list`, `isLoading`, `error`

### useCreateListVM
- Gerencia criação de nova lista
- Estado: `isLoading`, `error`
- Método: `createList(name)`

### useWeekPlanVM
- Gerencia plano semanal
- Carrega plano e refeições
- Estado: `plan`, `isLoading`, `error`

### useGeneratePlanVM
- Gerencia geração de plano
- Estado: `isLoading`, `error`
- Método: `generatePlan(preferences)`

### useAuthVM
- Gerencia autenticação
- Métodos: `signIn()`, `signUp()`, `signOut()`
- Estado: `isLoading`, `error`

---

## Componentes Principais

### HomeScreenView
- Exibe cards de refeição do dia
- Exibe card de plano semanal
- Lista de listas de compras
- FAB para criar nova lista

### ListDetailsView
- Header com título da lista
- Seções por categoria
- Itens da lista com checkboxes
- Botão adicionar item
- Botão gerar plano de refeições

### WeekPlanView
- Visualização do plano semanal
- Navegação entre dias
- Cards de refeições do dia
- Lista de refeições futuras

### RecipeDetailsView
- Imagem hero da receita
- Informações (rating, tempo, dificuldade)
- Ingredientes
- Instruções passo a passo
- Dica do chef IA
- Botão favoritar
- Botão começar a cozinhar

### PaywallView
- Lista de features premium
- Cards de planos (anual/mensal)
- Botão de trial
- Links legais

### ProfileView
- Informações do usuário
- Seção de assinatura
- Preferências alimentares
- Configurações de notificações
- Histórico de refeições
- Logout

---

## Configurações

### Variáveis de Ambiente

Arquivo `.env` (não versionado):
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

### Dependências Principais

```json
{
  "expo": "~54.0.25",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@supabase/supabase-js": "^2.86.0",
  "expo-router": "~6.0.15",
  "zustand": "^5.0.8",
  "react-native-reanimated": "~4.1.1",
  "react-native-gesture-handler": "~2.28.0"
}
```

### Scripts

- `npm start` - Inicia o Expo
- `npm run android` - Android
- `npm run ios` - iOS
- `npm run web` - Web
- `npm run lint` - Linter

---

## Próximos Passos para Backend

### 1. Estrutura do Banco de Dados

Criar as seguintes tabelas no Supabase:

#### Tabelas Principais

```sql
-- Tabela de perfis de usuário
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de listas de compras
CREATE TABLE grocery_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de itens da lista
CREATE TABLE grocery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID REFERENCES grocery_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity NUMERIC,
  unit TEXT,
  category TEXT,
  checked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de receitas
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instructions JSONB NOT NULL,
  ingredients JSONB NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de planos semanais
CREATE TABLE week_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de refeições do plano
CREATE TABLE plan_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES week_plans(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  day INTEGER NOT NULL CHECK (day >= 0 AND day <= 6),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de receitas favoritas
CREATE TABLE favorite_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);
```

#### Índices

```sql
-- Índices para performance
CREATE INDEX idx_grocery_lists_user_id ON grocery_lists(user_id);
CREATE INDEX idx_grocery_items_list_id ON grocery_items(list_id);
CREATE INDEX idx_week_plans_user_id ON week_plans(user_id);
CREATE INDEX idx_plan_meals_plan_id ON plan_meals(plan_id);
CREATE INDEX idx_plan_meals_recipe_id ON plan_meals(recipe_id);
CREATE INDEX idx_favorite_recipes_user_id ON favorite_recipes(user_id);
```

#### Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE grocery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_recipes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
-- User profiles: usuários só veem seu próprio perfil
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Grocery lists: usuários só veem suas próprias listas
CREATE POLICY "Users can view own lists" ON grocery_lists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own lists" ON grocery_lists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lists" ON grocery_lists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lists" ON grocery_lists
  FOR DELETE USING (auth.uid() = user_id);

-- Grocery items: usuários só veem itens de suas listas
CREATE POLICY "Users can view own items" ON grocery_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own items" ON grocery_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

-- Week plans: usuários só veem seus próprios planos
CREATE POLICY "Users can view own plans" ON week_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own plans" ON week_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Plan meals: usuários só veem refeições de seus planos
CREATE POLICY "Users can view own plan meals" ON plan_meals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM week_plans
      WHERE week_plans.id = plan_meals.plan_id
      AND week_plans.user_id = auth.uid()
    )
  );

-- Favorite recipes: usuários só veem suas favoritas
CREATE POLICY "Users can view own favorites" ON favorite_recipes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON favorite_recipes
  FOR ALL USING (auth.uid() = user_id);
```

### 2. Funções do Banco de Dados

#### Trigger para updated_at

```sql
-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas
CREATE TRIGGER update_grocery_lists_updated_at
  BEFORE UPDATE ON grocery_lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grocery_items_updated_at
  BEFORE UPDATE ON grocery_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_week_plans_updated_at
  BEFORE UPDATE ON week_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Função para criar perfil automaticamente

```sql
-- Criar perfil quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 3. APIs e Endpoints

#### Endpoints Necessários

1. **Geração de Plano de Refeições (IA)**
   - `POST /api/meal-plans/generate`
   - Input: preferências do usuário
   - Output: plano semanal com refeições

2. **Busca de Receitas**
   - `GET /api/recipes?search=...&filters=...`
   - Filtros: dieta, tempo, dificuldade, etc.

3. **Geração de Lista a partir de Plano**
   - `POST /api/lists/from-plan`
   - Input: `planId`
   - Output: lista de compras com itens agrupados

4. **Assinaturas**
   - `POST /api/subscriptions/create`
   - `GET /api/subscriptions/status`
   - `POST /api/subscriptions/cancel`

### 4. Integração com IA

Para gerar planos de refeições, será necessário:

- **API de IA**: OpenAI, Anthropic, ou similar
- **Prompt Engineering**: Criar prompts eficientes
- **Cache**: Cachear planos gerados
- **Rate Limiting**: Limitar gerações por usuário

### 5. Sistema de Assinaturas

- **Integração**: Stripe ou similar
- **Webhooks**: Processar eventos de assinatura
- **Status**: Atualizar `subscription_status` no banco
- **Trial**: Gerenciar período de trial

### 6. Upload de Imagens

- **Storage**: Supabase Storage ou S3
- **Upload**: Endpoint para upload de avatares
- **Receitas**: Upload de imagens de receitas

### 7. Notificações Push

- **Configuração**: Expo Notifications
- **Backend**: Serviço para enviar notificações
- **Casos de Uso**:
  - Lembrete de refeição do dia
  - Lista de compras pendente
  - Novas receitas recomendadas

### 8. Analytics e Métricas

- **Eventos**: Rastrear ações do usuário
- **Métricas**: Conversão, retenção, etc.
- **Ferramenta**: Mixpanel, Amplitude, ou similar

---

## Checklist de Migração para Backend

### Fase 1: Banco de Dados
- [ ] Criar todas as tabelas
- [ ] Configurar RLS
- [ ] Criar índices
- [ ] Criar triggers
- [ ] Criar função de perfil automático

### Fase 2: Repositórios
- [ ] Atualizar `ListsRepository` para usar tabelas reais
- [ ] Criar repositório para `grocery_items`
- [ ] Atualizar `MealPlansRepository`
- [ ] Atualizar `RecipesRepository`
- [ ] Criar repositório para `favorite_recipes`

### Fase 3: View Models
- [ ] Atualizar `useListDetailsVM` para carregar itens
- [ ] Implementar criação de itens
- [ ] Implementar atualização de itens
- [ ] Implementar geração de plano com IA

### Fase 4: Features
- [ ] Implementar adicionar item à lista
- [ ] Implementar remover item da lista
- [ ] Implementar marcar item como comprado
- [ ] Implementar geração de lista a partir de plano
- [ ] Implementar favoritar receitas

### Fase 5: Assinaturas
- [ ] Integrar sistema de pagamento
- [ ] Implementar webhooks
- [ ] Atualizar status de assinatura
- [ ] Implementar verificação de features premium

### Fase 6: Testes
- [ ] Testar criação de listas
- [ ] Testar CRUD de itens
- [ ] Testar geração de planos
- [ ] Testar autenticação
- [ ] Testar assinaturas

---

## Notas Finais

- O app está estruturado de forma modular e escalável
- A separação entre domain, data e view facilita a migração
- Os repositórios podem ser facilmente substituídos por chamadas de API
- O design system está bem organizado e reutilizável
- A arquitetura permite adicionar novas features facilmente

**Próximos Passos Recomendados:**
1. Criar schema do banco de dados
2. Implementar endpoints da API
3. Atualizar repositórios para usar API
4. Implementar geração de planos com IA
5. Integrar sistema de assinaturas
6. Adicionar testes

---

**Documentação criada em:** 27 de Janeiro de 2026
**Versão do App:** 1.0.0
