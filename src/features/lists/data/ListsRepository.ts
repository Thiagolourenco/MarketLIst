import { supabase } from '@/core/lib/supabase';
import { GroceryList } from '../domain/grocery-list.entity';
import { mapToGroceryList } from './lists.mapper';

export class ListsRepository {
  async getAll(): Promise<GroceryList[]> {
    const { data, error } = await supabase
      .from('grocery_lists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data?.map(mapToGroceryList) || [];
  }

  async getById(id: string): Promise<GroceryList> {
    const { data, error } = await supabase
      .from('grocery_lists')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapToGroceryList(data);
  }

  async create(list: Partial<GroceryList>): Promise<GroceryList> {
    const { data, error } = await supabase
      .from('grocery_lists')
      .insert(list)
      .select()
      .single();

    if (error) throw error;
    return mapToGroceryList(data);
  }

  async update(id: string, updates: Partial<GroceryList>): Promise<GroceryList> {
    const { data, error } = await supabase
      .from('grocery_lists')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapToGroceryList(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('grocery_lists')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
