import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ShoppingListItem } from "./ShoppingListItem";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

interface CategorySectionProps {
  category: string;
  items: ShoppingItem[];
  onItemToggle: (category: string, id: string) => void;
}

export function CategorySection({
  category,
  items,
  onItemToggle,
}: CategorySectionProps) {
  const handleToggle = (itemId: string) => {
    onItemToggle(category, itemId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <ShoppingListItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            checked={item.checked}
            onToggle={handleToggle}
            isFirst={index === 0}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    color: "#1F2925",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  itemsContainer: {
    width: 345,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginHorizontal: 24,
    overflow: "hidden",
  },
});
