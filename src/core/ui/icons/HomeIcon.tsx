import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function HomeIcon({
  width = 20,
  height = 20,
  color = '#6B7280',
}: HomeIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.5 17.5V10.8333C12.5 10.3731 12.1269 10 11.6667 10H8.33333C7.8731 10 7.5 10.3731 7.5 10.8333V17.5"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 8.33333C2.49988 7.8426 2.71603 7.37676 3.09083 7.05999L8.92417 2.05999C9.54532 1.53502 10.4547 1.53502 11.0758 2.05999L16.9092 7.05999C17.284 7.37676 17.5001 7.8426 17.5 8.33333V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V8.33333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
