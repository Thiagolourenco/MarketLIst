import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface AddCircleGreenIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function AddCircleGreenIcon({
  width = 18,
  height = 18,
  color = '#22C55E',
}: AddCircleGreenIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M1.5 9C1.5 13.1394 4.86064 16.5 9 16.5C13.1394 16.5 16.5 13.1394 16.5 9C16.5 4.86064 13.1394 1.5 9 1.5C4.86064 1.5 1.5 4.86064 1.5 9V9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 9H12M9 6V12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
