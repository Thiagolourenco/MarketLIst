import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BookmarkIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function BookmarkIcon({
  width = 24,
  height = 24,
  color = '#34C759',
}: BookmarkIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.25 2.625H6.75C5.71516 2.625 4.875 3.46516 4.875 4.5V21C4.87486 21.409 5.09675 21.7859 5.45447 21.9843C5.8122 22.1826 6.24939 22.1712 6.59625 21.9544L11.9991 18.5794L17.4038 21.9544C17.7506 22.1712 18.1878 22.1826 18.5455 21.9843C18.9033 21.7859 19.1251 21.409 19.125 21V4.5C19.125 3.46516 18.2848 2.625 17.25 2.625V2.625M16.875 18.9703L12.5953 16.2956C12.2305 16.0676 11.7676 16.0676 11.4028 16.2956L7.125 18.9703V4.875H16.875V18.9703"
        fill={color}
      />
    </Svg>
  );
}
