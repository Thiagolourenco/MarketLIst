import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SparklesIcon } from "@/src/core/ui/icons";

interface GenerateMealPlanButtonProps {
  onPress: () => void;
}

export function GenerateMealPlanButton({
  onPress,
}: GenerateMealPlanButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <SparklesIcon width={20} height={20} color="#FFFFFF" />
      <Text style={styles.text}>Generate Meal Plan</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#34C759",
  },
  text: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
