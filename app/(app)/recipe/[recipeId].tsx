import { useLocalSearchParams, useRouter } from 'expo-router';
import { RecipeDetailsView } from '@/src/features/recipes/view/RecipeDetailsView';

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    // TODO: Implement favorite logic
    console.log('Favorite toggled for recipe:', recipeId);
  };

  const handleStartCooking = () => {
    // TODO: Navigate to cooking mode
    console.log('Start cooking mode for recipe:', recipeId);
  };

  return (
    <RecipeDetailsView
      onBack={handleBack}
      onFavorite={handleFavorite}
      onStartCooking={handleStartCooking}
    />
  );
}
