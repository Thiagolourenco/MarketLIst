import { BackArrowIcon, MoreDotsIcon } from "@/src/core/ui/icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListHeaderProps {
  title: string;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

export function ListHeader({
  title,
  onBackPress,
  onMenuPress,
}: ListHeaderProps) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleMenu = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      // TODO: Implementar menu de opções
      console.log("Menu pressed");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBack}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <BackArrowIcon width={24} height={24} color="#1F2925" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={handleMenu}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <MoreDotsIcon width={24} height={24} color="#1F2925" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "#FAFAF9",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    zIndex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2925",
    flex: 1,
    textAlign: "center",
  },
});
