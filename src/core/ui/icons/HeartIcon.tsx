import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HeartIconProps {
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
}

export function HeartIcon({
  width = 24,
  height = 24,
  color = 'white',
  filled = false,
}: HeartIconProps) {
  if (filled) {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2 9.50003C2.00004 7.22198 3.40444 5.17972 5.53161 4.36443C7.65877 3.54914 10.0684 4.12957 11.591 5.82403C11.6969 5.93725 11.845 6.00152 12 6.00152C12.155 6.00152 12.3031 5.93725 12.409 5.82403C13.9271 4.11824 16.3426 3.53027 18.4749 4.34752C20.6071 5.16476 22.0109 7.21655 22 9.50003C22 11.79 20.5 13.5 19 15L13.508 20.313C13.1311 20.7459 12.5863 20.996 12.0123 20.9997C11.4383 21.0033 10.8904 20.7601 10.508 20.332L5 15C3.5 13.5 2 11.8 2 9.50003"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 9.50003C2.00004 7.22198 3.40444 5.17972 5.53161 4.36443C7.65877 3.54914 10.0684 4.12957 11.591 5.82403C11.6969 5.93725 11.845 6.00152 12 6.00152C12.155 6.00152 12.3031 5.93725 12.409 5.82403C13.9271 4.11824 16.3426 3.53027 18.4749 4.34752C20.6071 5.16476 22.0109 7.21655 22 9.50003C22 11.79 20.5 13.5 19 15L13.508 20.313C13.1311 20.7459 12.5863 20.996 12.0123 20.9997C11.4383 21.0033 10.8904 20.7601 10.508 20.332L5 15C3.5 13.5 2 11.8 2 9.50003"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
