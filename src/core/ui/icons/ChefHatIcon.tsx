import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChefHatIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ChefHatIcon({
  width = 14,
  height = 14,
  color = '#34C759',
}: ChefHatIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M9.91674 12.25C10.2387 12.25 10.5001 11.9887 10.5001 11.6667V8.54588C10.5001 8.2793 10.6844 8.05355 10.9242 7.93863C11.949 7.44974 12.4731 6.2941 12.1657 5.20102C11.8584 4.10795 10.8088 3.39483 9.67932 3.51171C9.21881 2.44128 8.16535 1.74768 7.00007 1.74768C5.83478 1.74768 4.78133 2.44128 4.32082 3.51171C3.19192 3.39565 2.14322 4.10864 1.83599 5.20111C1.52875 6.29357 2.05208 7.44867 3.07599 7.93805C3.31574 8.05355 3.50007 8.2793 3.50007 8.5453V11.6667C3.50007 11.9887 3.76145 12.25 4.0834 12.25H9.91674M3.50007 9.91671H10.5001"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
