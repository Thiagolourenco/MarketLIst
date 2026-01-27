import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FireIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function FireIcon({
  width = 14,
  height = 14,
  color = '#34C759',
}: FireIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7.00008 1.75C7.38897 3.30556 8.16675 4.56944 9.33341 5.54167C10.5001 6.51389 11.0834 7.58333 11.0834 8.75C11.0834 11.0037 9.25373 12.8333 7.00008 12.8333C4.74643 12.8333 2.91675 11.0037 2.91675 8.75C2.91675 8.11892 3.12143 7.50486 3.50008 7C3.50008 7.80488 4.15354 8.45833 4.95841 8.45833C5.76329 8.45833 6.41675 7.80488 6.41675 7C6.41675 5.83333 5.54175 5.25 5.54175 4.08333C5.54175 3.30556 6.02786 2.52778 7.00008 1.75"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
