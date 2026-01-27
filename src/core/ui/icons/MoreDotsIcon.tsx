import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface MoreDotsIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function MoreDotsIcon({
  width = 24,
  height = 24,
  color = '#1F2925',
}: MoreDotsIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="19" r="2" fill={color} />
    </Svg>
  );
}
