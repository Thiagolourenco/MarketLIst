import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "@/src/core/ui/icons";

interface ShoppingListItemProps {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  onToggle: (id: string) => void;
  isFirst?: boolean;
}

export function ShoppingListItem({
  id,
  name,
  quantity,
  checked,
  onToggle,
  isFirst = false,
}: ShoppingListItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isFirst && styles.firstItem]}
      onPress={() => onToggle(id)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <CheckIcon width={16} height={16} color="#FFFFFF" />}
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, checked && styles.nameChecked]}>
          {name}
        </Text>
        <Text style={[styles.quantity, checked && styles.quantityChecked]}>
          {quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  checkboxChecked: {
    backgroundColor: "#34C759",
    borderColor: "#D1D5DB",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
    flex: 1,
  },
  nameChecked: {
    textDecorationLine: "line-through",
    color: "#1F2925",
  },
  quantity: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    marginLeft: 8,
  },
  quantityChecked: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  firstItem: {
    borderTopWidth: 0,
  },
});
