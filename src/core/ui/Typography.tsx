import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type TypographyVariant =
  | 'title'
  | 'description'
  | 'badge'
  | 'button-primary'
  | 'button-secondary'
  | 'body'
  | 'caption';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text style={[styles[variant], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 38,
    color: '#1F2937',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
    textAlign: 'center',
  },
  badge: {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: '#34C759',
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  'button-primary': {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  'button-secondary': {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
  },
  caption: {
    fontFamily: 'Nimbus Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
});
