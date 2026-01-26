import { useState, useEffect } from 'react';
import { MealPlansRepository } from '../data/MealPlansRepository';
import { WeekPlan } from '../domain/week-plan.entity';

export function useWeekPlanVM(weekId: string) {
  const [plan, setPlan] = useState<WeekPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new MealPlansRepository();

  useEffect(() => {
    loadPlan();
  }, [weekId]);

  const loadPlan = async () => {
    setIsLoading(true);
    try {
      const data = await repository.getById(weekId);
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    plan,
    isLoading,
    error,
    refresh: loadPlan,
  };
}
