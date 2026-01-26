import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function WeekPlanScreen() {
  const { weekId } = useLocalSearchParams<{ weekId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Plan</Text>
      <Text style={styles.subtitle}>Week ID: {weekId}</Text>
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
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
});
