import { useState, useEffect } from 'react';
import { ListsRepository } from '../data/ListsRepository';
import { GroceryList } from '../domain/grocery-list.entity';

export function useHomeVM() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new ListsRepository();

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    setIsLoading(true);
    try {
      const data = await repository.getAll();
      setLists(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lists,
    isLoading,
    error,
    refresh: loadLists,
  };
}
