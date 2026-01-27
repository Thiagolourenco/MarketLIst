import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AddItemButton,
  CategorySection,
  GenerateMealPlanButton,
  ListHeader,
  ShoppingItem,
} from "./components";

export function ListDetailsView() {
  // Mock data - será substituído por dados reais depois
  const [items, setItems] = useState<Record<string, ShoppingItem[]>>({
    PRODUCE: [
      { id: "1", name: "Avocados", quantity: "2 units", checked: true },
      { id: "2", name: "Spinach", quantity: "1 bag", checked: false },
      { id: "3", name: "Cherry Tomatoes", quantity: "1 pint", checked: true },
    ],
    "DAIRY & EGGS": [
      { id: "4", name: "Oat Milk", quantity: "1 carton", checked: false },
      { id: "5", name: "Eggs", quantity: "1 dozen", checked: true },
    ],
  });

  const handleItemToggle = (category: string, itemId: string) => {
    setItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    }));
  };

  const handleAddItem = () => {
    // TODO: Implementar modal de adicionar item
    console.log("Add item pressed");
  };

  const handleGenerateMealPlan = () => {
    // TODO: Implementar navegação para gerar plano de refeições
    console.log("Generate meal plan pressed");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ListHeader title="This Week's Shopping" />
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(items).map(([category, categoryItems]) => (
          <CategorySection
            key={category}
            category={category}
            items={categoryItems}
            onItemToggle={handleItemToggle}
          />
        ))}

        <AddItemButton onPress={handleAddItem} />
      </ScrollView>
      <View style={styles.generateMealPlanButtonContainer}>
        <GenerateMealPlanButton onPress={handleGenerateMealPlan} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  safeArea: {
    backgroundColor: "#FAFAF9",
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 100, // Space for BottomTabBar
  },
  generateMealPlanButtonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
  },
});
