import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface AddCircleIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function AddCircleIcon({
  width = 24,
  height = 24,
  color = '#22C55E',
}: AddCircleIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="11"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M7.9165 12H16.0832M11.9998 7.91663V16.0833"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
