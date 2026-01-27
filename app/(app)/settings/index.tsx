import { ProfileView } from '@/src/features/profile/view';
import { router } from 'expo-router';
import React from 'react';

export default function SettingsScreen() {
  const handleLogOut = () => {
    // TODO: Implement logout logic
    console.log('Log out pressed');
    router.replace('/(auth)/sign-in');
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile pressed');
  };

  const handleUpgrade = () => {
    router.push('/(app)/paywall');
  };

  const handleEditPreferences = () => {
    router.push('/(app)/settings/preferences');
  };

  const handleMealHistory = () => {
    // TODO: Navigate to meal history screen
    console.log('Meal history pressed');
  };

  return (
    <ProfileView
      onLogOut={handleLogOut}
      onEditProfile={handleEditProfile}
      onUpgrade={handleUpgrade}
      onEditPreferences={handleEditPreferences}
      onMealHistory={handleMealHistory}
    />
  );
}
