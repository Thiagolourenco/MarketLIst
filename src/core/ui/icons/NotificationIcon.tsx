import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NotificationIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function NotificationIcon({
  width = 16,
  height = 16,
  color = '#EAB308',
}: NotificationIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.84535 13.9999C7.08353 14.4124 7.52368 14.6665 8.00001 14.6665C8.47634 14.6665 8.9165 14.4124 9.15468 13.9999M2.17468 10.2173C1.99674 10.4123 1.95065 10.6939 2.05715 10.9355C2.16365 11.1771 2.40267 11.3331 2.66668 11.3333H13.3333C13.5973 11.3333 13.8365 11.1777 13.9433 10.9363C14.0501 10.6948 14.0043 10.4132 13.8267 10.2179C12.94 9.30392 12 8.33259 12 5.33325C12 3.12559 10.2077 1.33325 8.00001 1.33325C5.79235 1.33325 4.00001 3.12559 4.00001 5.33325C4.00001 8.33259 3.05935 9.30392 2.17468 10.2173"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
