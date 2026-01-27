import { Image } from 'expo-image';
import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface UpcomingMealItemProps {
  title: string;
  day: string;
  prepTime: string;
  tags?: string[];
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
}

// Helper function to get badge style based on tag text
const getBadgeStyle = (tag: string) => {
  const lowerTag = tag.toLowerCase();
  if (lowerTag.includes('vegetarian') || lowerTag.includes('veggie')) {
    return {
      backgroundColor: '#E8EFED',
      textColor: '#5A756E',
    };
  }
  if (lowerTag.includes('protein') || lowerTag.includes('high protein')) {
    return {
      backgroundColor: '#FFF7ED',
      textColor: '#C2410C',
    };
  }
  if (lowerTag.includes('carb') || lowerTag.includes('low carb')) {
    return {
      backgroundColor: '#EFF6FF',
      textColor: '#1D4ED8',
    };
  }
  // Default badge style
  return {
    backgroundColor: '#F3F4F6',
    textColor: '#1F2925',
  };
};

export function UpcomingMealItem({
  title,
  day,
  prepTime,
  tags = [],
  imageUrl,
  imageSource,
  onPress,
}: UpcomingMealItemProps) {
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
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.timeText}>{prepTime}</Text>
        </View>
        
        <Text style={styles.titleText}>{title}</Text>
        
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => {
              const badgeStyle = getBadgeStyle(tag);
              return (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    { backgroundColor: badgeStyle.backgroundColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: badgeStyle.textColor },
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 16,
    width: 345,
    height: 106,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 12,
  },
  imageContainer: {
    width: 82,
    height: 82,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    color: '#5A756E',
  },
  titleText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2925',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
  },
  timeText: {
    fontFamily: 'Liberation Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#6B7280',
  },
});
