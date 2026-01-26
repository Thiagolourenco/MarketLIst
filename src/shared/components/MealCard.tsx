import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/core/ui/Card';

interface MealCardProps {
  title: string;
  description?: string;
  onPress?: () => void;
}

export function MealCard({ title, description, onPress }: MealCardProps) {
  const content = (
    <>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.card}>{content}</Card>
      </TouchableOpacity>
    );
  }

  return <Card style={styles.card}>{content}</Card>;
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
