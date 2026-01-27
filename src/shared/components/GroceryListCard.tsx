import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ListStatus = "active" | "done";

interface GroceryListCardProps {
  title: string;
  subtitle: string;
  status: ListStatus;
  progress: number;
  total: number;
  onPress?: () => void;
}

export function GroceryListCard({
  title,
  subtitle,
  status,
  progress,
  total,
  onPress,
}: GroceryListCardProps) {
  const progressPercentage = (progress / total) * 100;
  const isDone = status === "done";

  const content = (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={[styles.title, isDone && styles.titleDone]}>
            {title}
          </Text>
          <View style={[styles.badge, isDone && styles.badgeDone]}>
            <Text style={[styles.badgeText, isDone && styles.badgeTextDone]}>
              {status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={[styles.subtitle, isDone && styles.subtitleDone]}>
          {subtitle}
        </Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressSectionContent}>
          <Text
            style={[styles.progressLabel, isDone && styles.progressLabelDone]}
          >
            Progress
          </Text>
          <Text
            style={[styles.progressText, isDone && styles.progressTextDone]}
          >
            {progress}/{total}
          </Text>
        </View>

        <View
          style={[
            styles.progressBarContainer,
            isDone && styles.progressBarContainerDone,
          ]}
        >
          <View
            style={[
              styles.progressBar,
              { width: `${progressPercentage}%` },
              isDone && styles.progressBarDone,
            ]}
          />
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    gap: 16,
    width: 345,
    minHeight: 128,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    // width: 169.75,
    // height: 24,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
    flex: 1,
  },
  titleDone: {
    color: "#1F2925",
  },
  badge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: 59.67,
    height: 23,
    backgroundColor: "#E8EFED",
    borderRadius: 9999,
    justifyContent: "center",
  },
  badgeDone: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  badgeText: {
    // width: 39.67,
    // height: 15,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#5A756E",
  },
  badgeTextDone: {
    color: "#9CA3AF",
  },
  subtitle: {
    // width: 81.38,
    // height: 16,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
    marginTop: 6,
  },
  subtitleDone: {
    color: "#6B7280",
  },
  progressSection: {
    // flexDirection: "row",
    // alignItems: "center",
    width: "100%",
    // gap: 12,
  },
  progressSectionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 12,
    marginBottom: 6,
  },
  progressLabel: {
    // width: 48.03,
    // height: 16,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
  },
  progressLabelDone: {
    color: "#6B7280",
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#FAFAF9",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBarContainerDone: {
    backgroundColor: "#F3F4F6",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 9999,
  },
  progressBarDone: {
    backgroundColor: "#D1D5DB",
  },
  progressText: {
    // width: 30.03,
    // height: 16,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
    textAlign: "right",
  },
  progressTextDone: {
    color: "#6B7280",
  },
});
