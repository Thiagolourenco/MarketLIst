import { useState, useEffect } from 'react';
import { ListsRepository } from '../data/ListsRepository';
import { GroceryList } from '../domain/grocery-list.entity';

export function useListDetailsVM(listId: string) {
  const [list, setList] = useState<GroceryList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new ListsRepository();

  useEffect(() => {
    loadList();
  }, [listId]);

  const loadList = async () => {
    setIsLoading(true);
    try {
      const data = await repository.getById(listId);
      setList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateList = async (updates: Partial<GroceryList>) => {
    if (!list) return;

    try {
      const updated = await repository.update(listId, updates);
      setList(updated);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    list,
    isLoading,
    error,
    updateList,
    refresh: loadList,
  };
}
