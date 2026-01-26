import { router } from 'expo-router';

export function redirectToHome() {
  router.replace('/(app)');
}

export function redirectToSignIn() {
  router.replace('/(auth)/sign-in');
}

export function redirectToOnboarding() {
  router.replace('/(auth)/onboarding');
}
