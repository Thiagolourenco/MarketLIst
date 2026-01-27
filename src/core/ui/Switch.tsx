import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
}: SwitchProps) {
  const translateX = useSharedValue(value ? 0 : -20);
  const backgroundColor = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    translateX.value = withSpring(value ? 0 : -20, {
      damping: 15,
      stiffness: 150,
    });
    backgroundColor.value = withTiming(value ? 1 : 0, {
      duration: 200,
    });
  }, [value]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value === 1 ? '#22C55E' : '#E5E7EB',
    };
  });

  return (
    <TouchableOpacity
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyle,
          disabled && styles.disabled,
        ]}
      >
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#22C55E',
    top: 0,
    right: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});
