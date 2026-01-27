import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { GroceryListCard } from "@/src/shared/components";

interface GroceryList {
  id: string;
  title: string;
  subtitle: string;
  status: "active" | "done";
  progress: number;
  total: number;
}

export function ListsScreenView() {
  // Mock data - será substituído por dados reais depois
  const lists: GroceryList[] = [
    {
      id: "1",
      title: "This Week's Shopping",
      subtitle: "Created Oct 26",
      status: "active",
      progress: 12,
      total: 16,
    },
    {
      id: "2",
      title: "Thanksgiving Prep",
      subtitle: "Created Oct 19",
      status: "done",
      progress: 25,
      total: 25,
    },
    {
      id: "3",
      title: "Weekly Groceries",
      subtitle: "Created Oct 20",
      status: "active",
      progress: 8,
      total: 15,
    },
  ];

  const handleListPress = (listId: string) => {
    router.push(`/(app)/list/${listId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Grocery Lists</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listsContainer}>
          {lists.map((list) => (
            <GroceryListCard
              key={list.id}
              title={list.title}
              subtitle={list.subtitle}
              status={list.status}
              progress={list.progress}
              total={list.total}
              onPress={() => handleListPress(list.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    color: "#1F2925",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100, // Space for BottomTabBar
  },
  listsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
});
