import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ArrowRightIcon({
  width = 16,
  height = 16,
  color = 'white',
}: ArrowRightIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.33325 8.00004H12.6666M7.99992 3.33337L12.6666 8.00004L7.99992 12.6667"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
