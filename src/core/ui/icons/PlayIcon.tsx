import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlayIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function PlayIcon({
  width = 20,
  height = 20,
  color = 'white',
}: PlayIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.49976 7.5026C7.49885 7.20148 7.66046 6.9233 7.92248 6.77493C8.1845 6.62656 8.50618 6.63109 8.76393 6.78676L12.9281 9.28426C13.1803 9.43457 13.3348 9.7065 13.3348 10.0001C13.3348 10.2937 13.1803 10.5656 12.9281 10.7159L8.76393 13.2134C8.50605 13.3692 8.18419 13.3736 7.92211 13.2251C7.66003 13.0765 7.49855 12.798 7.49976 12.4968V7.5026"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.6665 10.0001C1.6665 14.5994 5.40055 18.3334 9.99984 18.3334C14.5991 18.3334 18.3332 14.5994 18.3332 10.0001C18.3332 5.40079 14.5991 1.66675 9.99984 1.66675C5.40055 1.66675 1.6665 5.40079 1.6665 10.0001V10.0001"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
