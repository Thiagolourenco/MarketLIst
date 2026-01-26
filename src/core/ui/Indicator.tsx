import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface IndicatorProps {
  active: boolean;
  style?: any;
}

export function Indicator({ active, style }: IndicatorProps) {
  const width = useSharedValue(8);
  const backgroundColor = useSharedValue('#E5E7EB');

  useEffect(() => {
    if (active) {
      width.value = withSpring(32, {
        damping: 15,
        stiffness: 150,
      });
      backgroundColor.value = withSpring('#34C759', {
        damping: 15,
        stiffness: 150,
      });
    } else {
      width.value = withSpring(8, {
        damping: 15,
        stiffness: 150,
      });
      backgroundColor.value = withSpring('#E5E7EB', {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.indicator,
        animatedStyle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    borderRadius: 9999,
    flex: 0,
    flexGrow: 0,
  },
});
