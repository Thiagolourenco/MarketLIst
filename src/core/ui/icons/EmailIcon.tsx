import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EmailIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function EmailIcon({
  width = 20,
  height = 20,
  color = '#9CA3AF',
}: EmailIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.3333 5.83337L10.8408 10.6059C10.3232 10.9065 9.6842 10.9065 9.16663 10.6059L1.66663 5.83337"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33329 3.33337H16.6666C17.5871 3.33337 18.3333 4.07957 18.3333 5.00004V15C18.3333 15.9205 17.5871 16.6667 16.6666 16.6667H3.33329C2.41282 16.6667 1.66663 15.9205 1.66663 15V5.00004C1.66663 4.07957 2.41282 3.33337 3.33329 3.33337V3.33337"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
