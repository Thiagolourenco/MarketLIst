export interface PlanMeal {
  id: string;
  planId: string;
  recipeId: string;
  day: number; // 0-6 (Sunday-Saturday)
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  createdAt: Date;
}
