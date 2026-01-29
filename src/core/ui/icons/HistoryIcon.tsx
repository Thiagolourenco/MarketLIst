import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HistoryIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function HistoryIcon({
  width = 16,
  height = 16,
  color = '#3B82F6',
}: HistoryIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2 8C2 11.3115 4.68851 14 8 14C11.3115 14 14 11.3115 14 8C14 4.68851 11.3115 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 2V5.33333H5.33333M8 4.66667V8L10.6667 9.33333"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
