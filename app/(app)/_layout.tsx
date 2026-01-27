import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="week" />
      <Stack.Screen name="list" />
      <Stack.Screen name="recipe" />
      <Stack.Screen 
        name="paywall" 
        options={{ 
          headerShown: false,
          presentation: 'card',
        }} 
      />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
