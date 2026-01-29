import { AppScreenWrapper } from "@/src/core/ui/AppScreenWrapper";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <AppScreenWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="week" />
        <Stack.Screen name="list" />
        <Stack.Screen name="recipe" />
        <Stack.Screen
          name="paywall"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen name="settings" />
      </Stack>
    </AppScreenWrapper>
  );
}
