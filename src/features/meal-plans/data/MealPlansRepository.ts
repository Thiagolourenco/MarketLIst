import { supabase } from '@/core/lib/supabase';
import { WeekPlan } from '../domain/week-plan.entity';

export class MealPlansRepository {
  async getById(id: string): Promise<WeekPlan> {
    const { data, error } = await supabase
      .from('week_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    // Map data to WeekPlan entity
    return data as any;
  }

  async generate(preferences: any): Promise<WeekPlan> {
    // Implementation for generating meal plan
    const { data, error } = await supabase
      .from('week_plans')
      .insert({ preferences })
      .select()
      .single();

    if (error) throw error;
    return data as any;
  }
}
