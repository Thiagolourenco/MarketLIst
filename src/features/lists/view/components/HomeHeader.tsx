import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { useSession } from '@/core/hooks/useSession';

export function HomeHeader() {
  const { session } = useSession();
  
  // Get user name from session metadata or email
  const userName = session?.user?.user_metadata?.name || 
                   session?.user?.user_metadata?.full_name ||
                   session?.user?.email?.split('@')[0] || 
                   'User';
  
  // Get user avatar URL from metadata
  const avatarUrl = session?.user?.user_metadata?.avatar_url || 
                    session?.user?.user_metadata?.picture ||
                    null;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>
          {getGreeting()},
        </Text>
        <Text style={styles.userNameText}>
          {userName}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
            contentFit="cover"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
  userNameText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: '#1F2925',
  },
  avatarButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.002)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: '#6B7280',
  },
});
