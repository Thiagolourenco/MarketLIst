import { useState } from 'react';
import { ListsRepository } from '../data/ListsRepository';
import { GroceryList } from '../domain/grocery-list.entity';

export function useCreateListVM() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new ListsRepository();

  const createList = async (name: string): Promise<GroceryList | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newList = await repository.create({ name });
      return newList;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createList,
    isLoading,
    error,
  };
}
