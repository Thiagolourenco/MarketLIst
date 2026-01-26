import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LockIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function LockIcon({
  width = 20,
  height = 20,
  color = '#9CA3AF',
}: LockIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16667 9.16663H15.8333C16.7538 9.16663 17.5 9.91282 17.5 10.8333V16.6666C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6666V10.8333C2.5 9.91282 3.24619 9.16663 4.16667 9.16663V9.16663"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.83337 9.16663V5.83329C5.83337 3.53365 7.70039 1.66663 10 1.66663C12.2997 1.66663 14.1667 3.53365 14.1667 5.83329V9.16663"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
