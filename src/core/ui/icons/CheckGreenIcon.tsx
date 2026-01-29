import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckGreenIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function CheckGreenIcon({
  width = 14,
  height = 14,
  color = '#22C55E',
}: CheckGreenIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M12.7172 5.83329C13.2662 8.52743 11.8593 11.2391 9.3406 12.3417C6.82186 13.4443 3.87515 12.6384 2.26812 10.4075C0.661094 8.17649 0.8301 5.12625 2.67376 3.08648C4.51742 1.04671 7.53512 0.571274 9.91663 1.94538"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.25 6.41671L7 8.16671L12.8333 2.33337"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
