import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function CheckIcon({
  width = 16,
  height = 16,
  color = 'white',
}: CheckIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M13.3333 4L6 11.3333L2.66667 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
