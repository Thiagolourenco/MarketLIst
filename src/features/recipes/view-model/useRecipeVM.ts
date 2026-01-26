import { useState, useEffect } from 'react';
import { RecipesRepository } from '../data/RecipesRepository';
import { Recipe } from '../domain/recipe.entity';

export function useRecipeVM(recipeId: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new RecipesRepository();

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    setIsLoading(true);
    try {
      const data = await repository.getById(recipeId);
      setRecipe(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recipe,
    isLoading,
    error,
    refresh: loadRecipe,
  };
}
