import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EyeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function EyeIcon({
  width = 20,
  height = 20,
  color = '#9CA3AF',
}: EyeIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.71835 10.2901C1.6489 10.103 1.6489 9.89715 1.71835 9.71006C3.1017 6.35581 6.37171 4.16724 10 4.16724C13.6283 4.16724 16.8983 6.35581 18.2817 9.71006C18.3511 9.89715 18.3511 10.103 18.2817 10.2901C16.8983 13.6443 13.6283 15.8329 10 15.8329C6.37171 15.8329 3.1017 13.6443 1.71835 10.2901"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 10C7.5 11.3798 8.62021 12.5 10 12.5C11.3798 12.5 12.5 11.3798 12.5 10C12.5 8.62021 11.3798 7.5 10 7.5C8.62021 7.5 7.5 8.62021 7.5 10V10"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
