import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Typography } from './Typography';

interface BadgeProps {
  text: string;
  style?: ViewStyle;
}

export function Badge({ text, style }: BadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <Typography variant="badge">{text}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: 28,
    backgroundColor: '#EAFBF1',
    borderRadius: 9999,
  },
});
