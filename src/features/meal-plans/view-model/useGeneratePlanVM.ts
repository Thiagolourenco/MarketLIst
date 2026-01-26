import { useState } from 'react';
import { MealPlansRepository } from '../data/MealPlansRepository';
import { WeekPlan } from '../domain/week-plan.entity';

export function useGeneratePlanVM() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new MealPlansRepository();

  const generatePlan = async (preferences: any): Promise<WeekPlan | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const plan = await repository.generate(preferences);
      return plan;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePlan,
    isLoading,
    error,
  };
}
