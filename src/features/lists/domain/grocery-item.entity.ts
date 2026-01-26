export interface GroceryItem {
  id: string;
  listId: string;
  name: string;
  quantity?: number;
  unit?: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
