import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Typography } from '@/src/core/ui';

interface PlanCardProps {
  title: string;
  price: string;
  period: string;
  discount?: string;
  isSelected?: boolean;
  showMostPopular?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function PlanCard({
  title,
  price,
  period,
  discount,
  isSelected = false,
  showMostPopular = false,
  onPress,
  style,
}: PlanCardProps) {
  const content = (
    <View style={[styles.container, isSelected && styles.selected, style]}>
      {showMostPopular && (
        <View style={styles.mostPopularBadge}>
          <Typography style={styles.mostPopularText}>MOST POPULAR</Typography>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.leftColumn}>
          <Typography style={styles.title}>{title}</Typography>
          {discount && (
            <Typography style={styles.discount}>{discount}</Typography>
          )}
        </View>
        <View style={styles.rightColumn}>
          <Typography style={styles.price}>
            {price}/{period}
          </Typography>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    width: 345,
    minHeight: 58,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative',
    alignSelf: 'stretch',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#34C759',
    height: 80,
  },
  mostPopularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    height: 24,
    backgroundColor: '#34C759',
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 12,
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mostPopularText: {
    width: 96.25,
    height: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    minHeight: 44,
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 129,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  discount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#34C759',
  },
  price: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#1C1C1E',
    textAlign: 'right',
    width: '100%',
  },
});
