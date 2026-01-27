import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface AddIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function AddIcon({
  width = 24,
  height = 24,
  color = 'white',
}: AddIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19M12 5V19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
