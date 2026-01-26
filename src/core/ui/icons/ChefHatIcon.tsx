import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChefHatIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ChefHatIcon({
  width = 32,
  height = 32,
  color = '#22C55E',
}: ChefHatIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M22.6666 28C23.4025 28 24 27.4026 24 26.6667V19.5334C24 18.924 24.4213 18.408 24.9693 18.1454C27.3118 17.0279 28.5098 14.3864 27.8072 11.888C27.1046 9.38952 24.7055 7.75954 22.124 8.0267C21.0714 5.58001 18.6635 3.99463 16 3.99463C13.3365 3.99463 10.9286 5.58001 9.87597 8.0267C7.29563 7.76141 4.89861 9.39111 4.19635 11.8882C3.49409 14.3852 4.69027 17.0255 7.03063 18.144C7.57863 18.408 7.99997 18.924 7.99997 19.532V26.6667C7.99997 27.4026 8.59741 28 9.3333 28H22.6666M7.99997 22.6667H24"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
