## Document the project

- Don't use Tailwindcdd, use StyleSheet
- Use zustand
- React Native Reanimated
- React Native Gesture Handler
- Use Expo-Router

## Example structure

marketlist/
├─ app/
│ ├─ \_layout.tsx
│ ├─ +not-found.tsx
│ ├─ (auth)/
│ │ ├─ \_layout.tsx
│ │ ├─ onboarding.tsx
│ │ ├─ sign-in.tsx
│ │ ├─ sign-up.tsx
│ │ └─ forgot-password.tsx
│ ├─ (app)/
│ │ ├─ \_layout.tsx
│ │ ├─ index.tsx # View: Home
│ │ ├─ week/
│ │ │ ├─ [weekId].tsx # View: Weekly Plan
│ │ │ └─ generate.tsx # View: Generating
│ │ ├─ list/
│ │ │ ├─ [listId].tsx # View: List Details (Checklist)
│ │ │ └─ create.tsx
│ │ ├─ recipe/
│ │ │ └─ [recipeId].tsx # View: Recipe
│ │ ├─ paywall/
│ │ │ └─ index.tsx
│ │ └─ settings/
│ │ ├─ index.tsx
│ │ ├─ preferences.tsx
│ │ └─ subscription.tsx
│ └─ modal/
│ ├─ \_layout.tsx
│ └─ create-list.tsx
│
├─ src/
│ ├─ core/
│ │ ├─ lib/
│ │ │ ├─ supabase.ts
│ │ │ ├─ env.ts
│ │ │ └─ constants.ts
│ │ ├─ navigation/ # helpers (redirects, guards)
│ │ ├─ ui/ # design system base (Button, Card, Input)
│ │ ├─ hooks/ # useSession, useRequireAuth
│ │ ├─ theme/ # colors, typography, spacing
│ │ └─ types/
│ │ └─ db.ts
│ │
│ ├─ features/
│ │ ├─ auth/
│ │ │ ├─ view/ # UI components for auth screens
│ │ │ ├─ view-model/ # useAuthVM, useOnboardingVM
│ │ │ ├─ data/ # AuthRepository
│ │ │ └─ domain/ # (optional) entities
│ │ │
│ │ ├─ lists/
│ │ │ ├─ view/
│ │ │ │ ├─ HomeScreenView.tsx
│ │ │ │ ├─ CreateListView.tsx
│ │ │ │ └─ ListDetailsView.tsx
│ │ │ ├─ view-model/
│ │ │ │ ├─ useHomeVM.ts
│ │ │ │ ├─ useCreateListVM.ts
│ │ │ │ └─ useListDetailsVM.ts
│ │ │ ├─ data/
│ │ │ │ ├─ ListsRepository.ts
│ │ │ │ └─ lists.mapper.ts
│ │ │ └─ domain/
│ │ │ ├─ grocery-list.entity.ts
│ │ │ └─ grocery-item.entity.ts
│ │ │
│ │ ├─ meal-plans/
│ │ │ ├─ view/
│ │ │ │ ├─ WeekPlanView.tsx
│ │ │ │ └─ GeneratePlanView.tsx
│ │ │ ├─ view-model/
│ │ │ │ ├─ useWeekPlanVM.ts
│ │ │ │ └─ useGeneratePlanVM.ts
│ │ │ ├─ data/
│ │ │ │ └─ MealPlansRepository.ts
│ │ │ └─ domain/
│ │ │ ├─ week-plan.entity.ts
│ │ │ └─ plan-meal.entity.ts
│ │ │
│ │ ├─ recipes/
│ │ │ ├─ view/
│ │ │ │ └─ RecipeDetailsView.tsx
│ │ │ ├─ view-model/
│ │ │ │ └─ useRecipeVM.ts
│ │ │ ├─ data/
│ │ │ │ └─ RecipesRepository.ts
│ │ │ └─ domain/
│ │ │ └─ recipe.entity.ts
│ │ │
│ │ └─ subscriptions/
│ │ ├─ view/
│ │ ├─ view-model/
│ │ ├─ data/
│ │ └─ domain/
│ │
│ └─ shared/
│ ├─ components/ # shared components (MealCard, EmptyState)
│ └─ utils/
│
├─ supabase/
│ ├─ migrations/
│ └─ functions/
│
└─ ...
