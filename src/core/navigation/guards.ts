import { router } from 'expo-router';
import { useSession } from '@/core/hooks/useSession';

export function useRequireAuth() {
  const { session, isLoading } = useSession();

  if (!isLoading && !session) {
    router.replace('/(auth)/sign-in');
  }

  return { session, isLoading };
}
