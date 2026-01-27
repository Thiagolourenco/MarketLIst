import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UpdateIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function UpdateIcon({
  width = 20,
  height = 20,
  color = '#34C759',
}: UpdateIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 2.5V6.66667H13.3333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66667 13.3334H2.5V17.5"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
