export const APP_NAME = 'ListByMarket';

export const ROUTES = {
  AUTH: {
    ONBOARDING: '/(auth)/onboarding',
    SIGN_IN: '/(auth)/sign-in',
    SIGN_UP: '/(auth)/sign-up',
    FORGOT_PASSWORD: '/(auth)/forgot-password',
  },
  APP: {
    HOME: '/(app)',
    WEEK_PLAN: (weekId: string) => `/(app)/week/${weekId}`,
    GENERATE_PLAN: '/(app)/week/generate',
    LIST_DETAILS: (listId: string) => `/(app)/list/${listId}`,
    CREATE_LIST: '/(app)/list/create',
    RECIPE: (recipeId: string) => `/(app)/recipe/${recipeId}`,
    PAYWALL: '/(app)/paywall',
    SETTINGS: '/(app)/settings',
    PREFERENCES: '/(app)/settings/preferences',
    SUBSCRIPTION: '/(app)/settings/subscription',
  },
  MODAL: {
    CREATE_LIST: '/modal/create-list',
  },
} as const;
