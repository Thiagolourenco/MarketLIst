import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CalendarIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function CalendarIcon({
  width = 20,
  height = 20,
  color = '#6B7280',
}: CalendarIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.66663 1.66675V5.00008M13.3333 1.66675V5.00008"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.16667 3.33325H15.8333C16.7538 3.33325 17.5 4.07944 17.5 4.99992V16.6666C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6666V4.99992C2.5 4.07944 3.24619 3.33325 4.16667 3.33325V3.33325"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 8.33325H17.5M6.66667 11.6666H6.675M10 11.6666H10.0083M13.3333 11.6666H13.3417M6.66667 14.9999H6.675M10 14.9999H10.0083M13.3333 14.9999H13.3417"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
