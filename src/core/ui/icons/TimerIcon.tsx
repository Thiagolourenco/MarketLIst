import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TimerIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function TimerIcon({
  width = 14,
  height = 14,
  color = '#34C759',
}: TimerIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7 3.5V7L9.33333 8.16667"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.1665 6.99996C1.1665 10.2195 3.78033 12.8333 6.99984 12.8333C10.2193 12.8333 12.8332 10.2195 12.8332 6.99996C12.8332 3.78045 10.2193 1.16663 6.99984 1.16663C3.78033 1.16663 1.1665 3.78045 1.1665 6.99996V6.99996"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
