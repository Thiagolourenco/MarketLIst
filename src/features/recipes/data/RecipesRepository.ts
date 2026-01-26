import { supabase } from '@/core/lib/supabase';
import { Recipe } from '../domain/recipe.entity';

export class RecipesRepository {
  async getById(id: string): Promise<Recipe> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as any;
  }

  async getAll(): Promise<Recipe[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
