import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ChevronRightIcon({
  width = 16,
  height = 16,
  color = '#D1D5DB',
}: ChevronRightIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6 12L10 8L6 4"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
