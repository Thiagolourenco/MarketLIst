import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UpdateIcon } from '@/core/ui/icons';
import { TodayMealCard } from './components/TodayMealCard';
import { UpcomingMealItem } from './components/UpcomingMealItem';

interface UpcomingMeal {
  id: string;
  title: string;
  day: string;
  prepTime: string;
  tags?: string[];
  imageUrl?: string;
}

interface WeekPlanViewProps {
  dateRange?: string;
  todayMeal?: {
    title: string;
    description: string;
    prepTime: string;
    mealType: string;
    imageUrl?: string;
  };
  upcomingMeals?: UpcomingMeal[];
  onRefresh?: () => void;
  onMealPress?: (mealId: string) => void;
  onStartCooking?: () => void;
}

export function WeekPlanView({
  dateRange = 'OCT 26 - NOV 01',
  todayMeal,
  upcomingMeals = [],
  onRefresh,
  onMealPress,
  onStartCooking,
}: WeekPlanViewProps) {
  // Mock data if not provided
  const defaultTodayMeal = todayMeal || {
    title: 'Lemon Herb Roasted Chicken',
    description: 'A simple, flavorful roast perfect for a cozy evening. Uses the rosemary and potatoes from your pantry.',
    prepTime: '45 min',
    mealType: 'DINNER',
  };

  const defaultUpcomingMeals: UpcomingMeal[] = upcomingMeals.length > 0 
    ? upcomingMeals 
    : [
        {
          id: '1',
          title: 'Basil Pesto Pasta',
          day: 'TUESDAY',
          prepTime: '25 min',
          tags: ['Vegetarian'],
        },
        {
          id: '2',
          title: 'Grilled Salmon & Greens',
          day: 'WEDNESDAY',
          prepTime: '30 min',
          tags: ['High Protein'],
        },
        {
          id: '3',
          title: 'Quick Veggie Stir Fry',
          day: 'THURSDAY',
          prepTime: '20 min',
          tags: ['Low Carb'],
        },
      ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.dateRangeText}>{dateRange}</Text>
            <Text style={styles.titleText}>Weekly Plan</Text>
          </View>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={onRefresh}
            activeOpacity={0.7}
          >
            <View style={styles.refreshIconContainer}>
              <UpdateIcon width={20} height={20} color="#34C759" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Meal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Meal</Text>
          <TodayMealCard
            title={defaultTodayMeal.title}
            description={defaultTodayMeal.description}
            prepTime={defaultTodayMeal.prepTime}
            mealType={defaultTodayMeal.mealType}
            imageUrl={defaultTodayMeal.imageUrl}
            onPress={() => onMealPress?.('today')}
            onStartCooking={onStartCooking}
          />
        </View>

        {/* Coming Up Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Up</Text>
          {defaultUpcomingMeals.map((meal) => (
            <UpcomingMealItem
              key={meal.id}
              title={meal.title}
              day={meal.day}
              prepTime={meal.prepTime}
              tags={meal.tags}
              imageUrl={meal.imageUrl}
              onPress={() => onMealPress?.(meal.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100, // Space for BottomTabBar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  dateRangeText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#5A756E',
    marginBottom: 4,
  },
  titleText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: '#1F2925',
  },
  refreshButton: {
    marginLeft: 16,
  },
  refreshIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
    color: '#1F2925',
    marginBottom: 16,
  },
});
