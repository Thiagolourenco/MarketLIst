import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function SignUpView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up View</Text>
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
