import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BarChartIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function BarChartIcon({
  width = 14,
  height = 14,
  color = '#34C759',
}: BarChartIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M2.91675 12.25V8.75M7.00008 12.25V1.75M11.0834 12.25V5.25"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
