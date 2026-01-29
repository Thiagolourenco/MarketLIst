import { AddIcon } from "@/src/core/ui/icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddItemButtonProps {
  onPress: () => void;
}

export function AddItemButton({ onPress }: AddItemButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AddIcon width={20} height={20} color="#1F2925" />
      <Text style={styles.text}>Add Item</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    // paddingHorizontal: 0,
    width: 345,
    height: 52,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
  },
  text: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
    marginLeft: 8,
  },
});
