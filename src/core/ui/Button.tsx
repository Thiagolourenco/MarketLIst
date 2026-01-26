import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'skip';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Typography
        variant={variant === 'primary' ? 'button-primary' : 'button-secondary'}
        style={textStyle}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    maxWidth: 323,
    height: 56,
    alignSelf: 'stretch',
  },
  primary: {
    backgroundColor: '#34C759',
    borderRadius: 16,
    shadowColor: '#34C759',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  skip: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
});
