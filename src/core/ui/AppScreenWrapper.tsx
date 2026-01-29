import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { BottomTabBar, TabRoute } from './BottomTabBar';

interface AppScreenWrapperProps {
  children: React.ReactNode;
}

export function AppScreenWrapper({ children }: AppScreenWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Map pathnames to tab routes
  const getActiveRoute = (): TabRoute => {
    const path = pathname || '';
    
    // Check exact matches first
    if (path === '/(app)/home' || path.includes('/home')) return 'home';
    if (path === '/(app)/list' || (path.includes('/list') && !path.includes('/list/'))) return 'list';
    if (path === '/(app)/week' || (path.includes('/week') && !path.includes('/week/'))) return 'calendar';
    if (path.includes('/settings')) return 'profile';
    
    return 'home'; // default
  };

  const handleRouteChange = (route: TabRoute) => {
    // Prevent navigation if already on the target route
    const currentRoute = getActiveRoute();
    if (currentRoute === route) return;

    switch (route) {
      case 'home':
        router.replace('/(app)/home');
        break;
      case 'list':
        router.replace('/(app)/list');
        break;
      case 'calendar':
        router.replace('/(app)/week');
        break;
      case 'profile':
        router.replace('/(app)/settings');
        break;
    }
  };

  // Don't show bottom tab on paywall or other modal/detail screens
  const shouldShowBottomTab = 
    !pathname?.includes('/paywall') && 
    !pathname?.includes('/recipe/') &&
    !pathname?.includes('/list/') &&
    !pathname?.includes('/week/') &&
    pathname !== '/(app)/list/create';

  return (
    <View style={styles.container}>
      {children}
      {shouldShowBottomTab && (
        <BottomTabBar
          activeRoute={getActiveRoute()}
          onRouteChange={handleRouteChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
