export interface Recipe {
  id: string;
  name: string;
  description?: string;
  instructions: string[];
  ingredients: RecipeIngredient[];
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  servings?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeIngredient {
  name: string;
  quantity?: number;
  unit?: string;
}
