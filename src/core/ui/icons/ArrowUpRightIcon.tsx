import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowUpRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ArrowUpRightIcon({
  width = 16,
  height = 16,
  color = 'white',
}: ArrowUpRightIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4.66663 4.66675H11.3333V11.3334M4.66663 11.3334L11.3333 4.66675"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
