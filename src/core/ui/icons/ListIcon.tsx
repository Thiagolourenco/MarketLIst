import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ListIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ListIcon({
  width = 20,
  height = 20,
  color = 'white',
}: ListIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.8333 4.16675H17.5M10.8333 10.0001H17.5M10.8333 15.8334H17.5M2.5 14.1667L4.16667 15.8334L7.5 12.5001M2.5 5.83341L4.16667 7.50008L7.5 4.16675"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
