import { Image } from "expo-image";
import React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MealCardProps {
  title: string;
  footerText?: string;
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
  showTodayBadge?: boolean;
}

export function MealCard({
  title,
  footerText,
  imageUrl,
  imageSource,
  onPress,
  showTodayBadge = false,
}: MealCardProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.mealImage}
            contentFit="cover"
          />
        ) : imageSource ? (
          <Image
            source={imageSource}
            style={styles.mealImage}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.mealImage, styles.placeholderImage]} />
        )}
        {showTodayBadge && (
          <View style={styles.todayBadge}>
            <Text style={styles.todayBadgeText}>TODAY</Text>
          </View>
        )}
      </View>

      <Text style={styles.titleText}>{title}</Text>

      {footerText && <Text style={styles.footerText}>{footerText}</Text>}
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
    padding: 12,
    width: 164.5,
    height: 196.88,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
    width: 138.5,
    height: 103.88,
    borderRadius: 12,
    position: "relative",
    overflow: "hidden",
  },
  mealImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  placeholderImage: {
    backgroundColor: "#F3F4F6",
  },
  todayBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  todayBadgeText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 12,
    color: "#1F2925",
    textTransform: "uppercase",
  },
  titleText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: "#1F2925",
    marginTop: 12,
  },
  footerText: {
    // width: 73.59,
    // height: 16,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
    marginTop: 4,
  },
});
