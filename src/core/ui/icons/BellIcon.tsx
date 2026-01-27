import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BellIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function BellIcon({
  width = 20,
  height = 20,
  color = '#FFFFFF',
}: BellIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15 6.66667C15 4.08934 12.9107 2 10.3333 2C7.756 2 5.66667 4.08934 5.66667 6.66667C5.66667 10 3 11.3333 3 11.3333H17.6667C17.6667 11.3333 15 10 15 6.66667Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5534 15C11.4001 15.1771 11.2094 15.3197 10.9938 15.4182C10.7782 15.5167 10.5426 15.5686 10.3034 15.5686C10.0642 15.5686 9.82864 15.5167 9.61304 15.4182C9.39744 15.3197 9.20676 15.1771 9.05341 15"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
