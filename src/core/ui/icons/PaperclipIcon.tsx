import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface PaperclipIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function PaperclipIcon({
  width = 12,
  height = 24,
  color = '#E5E7EB',
}: PaperclipIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 24" fill="none">
      <Rect
        x="1"
        y="1"
        width="10"
        height="22"
        rx="5"
        stroke={color}
        strokeWidth="2"
      />
      <Rect
        x="2"
        y="8"
        width="8"
        height="8"
        rx="4"
        fill={color}
      />
    </Svg>
  );
}
