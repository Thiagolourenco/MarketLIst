import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { Typography } from "./Typography";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "skip" | "cta";
  disabled?: boolean;
  activeIndicator?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  activeIndicator = false,
  style,
  textStyle,
}: ButtonProps) {
  const showLoading = Boolean(activeIndicator);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        (disabled || showLoading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || showLoading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {showLoading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === "primary" || variant === "cta" ? "#FFFFFF" : "#34C759"
            }
            style={styles.spinner}
          />
        ) : null}
        <Typography
          variant={
            variant === "primary" || variant === "cta"
              ? "button-primary"
              : "button-secondary"
          }
          style={[variant === "cta" && styles.ctaText, textStyle]}
        >
          {title}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: "100%",
    maxWidth: 323,
    height: 56,
    alignSelf: "stretch",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    marginRight: 10,
  },
  primary: {
    backgroundColor: "#34C759",
    borderRadius: 16,
    shadowColor: "#34C759",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  secondary: {
    backgroundColor: "transparent",
  },
  skip: {
    backgroundColor: "transparent",
  },
  cta: {
    backgroundColor: "#FFB020",
    borderRadius: 12,
    height: 60,
    paddingVertical: 16,
    maxWidth: 345,
  },
  disabled: {
    opacity: 0.5,
  },
  ctaText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 28,
    color: "#FFFFFF",
  },
});
