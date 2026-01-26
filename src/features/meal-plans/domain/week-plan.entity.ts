import { PlanMeal } from './plan-meal.entity';

export interface WeekPlan {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  meals: PlanMeal[];
  createdAt: Date;
  updatedAt: Date;
}
