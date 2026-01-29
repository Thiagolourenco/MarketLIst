import { GroceryListCard } from "@/src/shared/components";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GroceryList {
  id: string;
  title: string;
  subtitle: string;
  status: "active" | "done";
  progress: number;
  total: number;
}

interface GroceryListsSectionProps {
  lists?: GroceryList[];
  onViewAll?: () => void;
  onListPress?: (listId: string) => void;
}

export function GroceryListsSection({
  lists = [],
  onViewAll,
  onListPress,
}: GroceryListsSectionProps) {
  // Mock data for now - will be replaced with real data
  const defaultLists: GroceryList[] = [
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
  ];

  const displayLists = lists.length > 0 ? lists : defaultLists;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grocery Lists</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllButton}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listsContainer}>
        {displayLists.map((list) => (
          <GroceryListCard
            key={list.id}
            title={list.title}
            subtitle={list.subtitle}
            status={list.status}
            progress={list.progress}
            total={list.total}
            onPress={() => onListPress?.(list.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    width: 116.06,
    height: 28,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2925",
  },
  viewAllButton: {
    width: 41.81,
    height: 16,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: "#5A756E",
  },
  listsContainer: {
    gap: 12,
  },
});
