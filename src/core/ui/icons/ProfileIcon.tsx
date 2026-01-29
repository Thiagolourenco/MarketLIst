import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ProfileIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ProfileIcon({
  width = 20,
  height = 20,
  color = '#6B7280',
}: ProfileIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.8334 17.5V15.8333C15.8334 13.9924 14.341 12.5 12.5001 12.5H7.50008C5.65913 12.5 4.16675 13.9924 4.16675 15.8333V17.5"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66675 5.83333C6.66675 7.67305 8.16036 9.16667 10.0001 9.16667C11.8398 9.16667 13.3334 7.67305 13.3334 5.83333C13.3334 3.99362 11.8398 2.5 10.0001 2.5C8.16036 2.5 6.66675 3.99362 6.66675 5.83333V5.83333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
