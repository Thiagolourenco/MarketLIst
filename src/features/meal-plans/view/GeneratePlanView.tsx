import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function GeneratePlanView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Plan View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
