import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "./Typography";

export type ToastType = "success" | "error" | "info";

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastProps extends ToastConfig {
  visible: boolean;
  onHide: () => void;
}

const COLORS: Record<ToastType, { bg: string; text: string; border: string }> =
  {
    success: { bg: "#F0FDF4", text: "#166534", border: "#22C55E" },
    error: { bg: "#FEF2F2", text: "#991B1B", border: "#EF4444" },
    info: { bg: "#EFF6FF", text: "#1E40AF", border: "#3B82F6" },
  };

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const DEFAULT_DURATION = 4000;

export function Toast({
  message,
  type = "info",
  duration = DEFAULT_DURATION,
  visible,
  onHide,
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    timerRef.current = null;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, [onHide, translateY, opacity]);

  useEffect(() => {
    if (!visible || !message) return;

    translateY.setValue(-120);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const d = duration ?? DEFAULT_DURATION;
    timerRef.current = setTimeout(hideToast, d);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, message, duration, translateY, opacity, hideToast]);

  if (!visible || !message) return null;

  const colors = COLORS[type];
  const icon = ICONS[type];
  const top = Math.max(insets.top + 8, 52);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top,
          backgroundColor: colors.bg,
          borderLeftColor: colors.border,
          transform: [{ translateY }],
          opacity,
          ...(Platform.OS === "android" ? { elevation: 999 } : {}),
        },
      ]}
      pointerEvents="none"
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.border }]}>
        <Typography style={[styles.icon, { color: "#FFFFFF" }]}>
          {icon}
        </Typography>
      </View>
      <Typography style={[styles.message, { color: colors.text }]}>
        {message}
      </Typography>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    zIndex: 99999,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 14,
    fontWeight: "700",
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
});
