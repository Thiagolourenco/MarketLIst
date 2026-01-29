import { Image } from 'expo-image';
import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TimerIcon, ArrowRightIcon } from '@/core/ui/icons';

interface TodayMealCardProps {
  title: string;
  description: string;
  prepTime: string;
  mealType: string;
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
  onStartCooking?: () => void;
}

export function TodayMealCard({
  title,
  description,
  prepTime,
  mealType,
  imageUrl,
  imageSource,
  onPress,
  onStartCooking,
}: TodayMealCardProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.mealImage}
            contentFit="cover"
          />
        ) : imageSource ? (
          <Image
            source={imageSource}
            style={styles.mealImage}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.mealImage, styles.placeholderImage]} />
        )}
        <View style={styles.mealTypeBadge}>
          <Text style={styles.mealTypeText}>{mealType}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.timeBadge}>
            <TimerIcon width={12} height={12} color="#6B7280" />
            <Text style={styles.timeText}>{prepTime}</Text>
          </View>
        </View>

        <Text style={styles.descriptionText} numberOfLines={2}>
          {description}
        </Text>

        <TouchableOpacity
          style={styles.startCookingButton}
          onPress={onStartCooking}
          activeOpacity={0.8}
        >
          <Text style={styles.startCookingText}>Start Cooking</Text>
          <ArrowRightIcon width={16} height={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 345,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 343 / 224,
    position: 'relative',
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#F3F4F6',
  },
  mealTypeBadge: {
    position: 'absolute',
    left: 16,
    top: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    // Note: backdrop-filter is not supported in React Native
    // Using backgroundColor with opacity instead
  },
  mealTypeText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 16,
    color: '#1F2937',
    textTransform: 'uppercase',
  },
  contentContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: '#1F2925',
    flex: 1,
    marginRight: 12,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FAFAF9',
    borderRadius: 6,
    gap: 4,
  },
  timeText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#6B7280',
  },
  descriptionText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 16,
  },
  startCookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  startCookingText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});
