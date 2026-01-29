import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ArrowUpRightIcon } from '@/core/ui/icons';

interface WeeklyPlanCardProps {
  currentDay: number;
  totalDays: number;
  onPress?: () => void;
}

export function WeeklyPlanCard({ 
  currentDay, 
  totalDays,
  onPress 
}: WeeklyPlanCardProps) {
  const progress = (currentDay / totalDays) * 100;

  const content = (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Plan</Text>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <ArrowUpRightIcon width={16} height={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.daySection}>
        <Text style={styles.dayText}>Day {currentDay}</Text>
        <Text style={styles.progressText}>of {totalDays} days planned</Text>
      </View>
      
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    width: 164.5,
    height: 196.88,
    backgroundColor: '#34C759',
    borderRadius: 16,
    shadowColor: '#7C9A92',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
  },
  title: {
    width: 81.45,
    height: 20,
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  iconButton: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dayText: {
    width: 64.05,
    height: 32,
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#FFFFFF',
  },
  progressText: {
    width: 94.75,
    height: 16,
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  progressBarWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  progressBarContainer: {
    width: 132.5,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
  },
});
