import { useSession } from "@/core/hooks/useSession";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) return null;

  return session ? (
    <Redirect href="/(app)/home" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}
