import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddIcon } from './icons';

interface FABButtonProps {
  onPress?: () => void;
}

export function FABButton({ onPress }: FABButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.button}>
        <AddIcon width={24} height={24} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 56,
    height: 56,
    right: 24,
    bottom: 96,
    zIndex: 2,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 56,
    height: 56,
    backgroundColor: '#1F2925',
    borderWidth: 4,
    borderColor: '#FAFAF9',
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
});
