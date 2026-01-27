import { useRouter } from 'expo-router';
import { WeekPlanView } from '@/src/features/meal-plans/view/WeekPlanView';

export default function WeekScreen() {
  const router = useRouter();

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log('Refreshing week plan...');
  };

  const handleMealPress = (mealId: string) => {
    // Navigate to recipe details screen
    // Using a default recipe ID for now - in production this would come from the meal data
    router.push('/(app)/recipe/1');
  };

  const handleStartCooking = () => {
    // Navigate to recipe details screen to start cooking
    router.push('/(app)/recipe/1');
  };

  return (
    <WeekPlanView
      onRefresh={handleRefresh}
      onMealPress={handleMealPress}
      onStartCooking={handleStartCooking}
    />
  );
}
