import { GroceryList } from '../domain/grocery-list.entity';

export function mapToGroceryList(data: any): GroceryList {
  return {
    id: data.id,
    name: data.name,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}
