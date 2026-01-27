import { MealCard, WeeklyPlanCard } from "@/src/shared/components";
import { FABButton } from "@/src/core/ui";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeVM } from "../view-model/useHomeVM";
import { HomeHeader } from "./components/HomeHeader";
import { GroceryListsSection } from "./components/GroceryListsSection";
import { CreateListBottomSheet } from "./components/CreateListBottomSheet";

export function HomeScreenView() {
  const { lists, isLoading, error } = useHomeVM();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleCreateList = (listName: string, categories: any[]) => {
    // TODO: Implementar criação de lista no backend
    console.log("Creating list:", listName, categories);
    // Por enquanto apenas fecha o bottom sheet
    setIsBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />

        <View style={styles.cardsContainer}>
          <MealCard
            title="Roasted Veggie Bowl"
            footerText="25 min • Easy"
            showTodayBadge={true}
          />
          <WeeklyPlanCard currentDay={4} totalDays={7} />
        </View>

        <GroceryListsSection />
      </ScrollView>
      
      <FABButton onPress={() => setIsBottomSheetVisible(true)} />

      <CreateListBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onCreateList={handleCreateList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for BottomTabBar (66px height + 20px padding + margin)
  },
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 16,
  },
});
