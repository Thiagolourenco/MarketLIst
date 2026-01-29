import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BackArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function BackArrowIcon({
  width = 24,
  height = 24,
  color = 'white',
}: BackArrowIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19L5 12L12 5M19 12H5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
