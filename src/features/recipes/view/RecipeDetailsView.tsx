import {
  BackArrowIcon,
  BarChartIcon,
  ChefHatIcon,
  FireIcon,
  HeartIcon,
  PlayIcon,
  SparklesIcon,
  StarIcon,
  TimerIcon,
} from "@/core/ui/icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface RecipeDetailsViewProps {
  title: string;
  rating?: number;
  prepTime?: string;
  difficulty?: string;
  calories?: string;
  aiChefTip?: string;
  ingredients?: { name: string; quantity?: string }[];
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  onBack?: () => void;
  onFavorite?: () => void;
  onStartCooking?: () => void;
}

export function RecipeDetailsView({
  title = "Lemon Herb Roasted Chicken",
  rating = 4.8,
  prepTime = "45 min",
  difficulty = "Beginner",
  calories = "420 kcal",
  aiChefTip = "Use the leftover rosemary stems from your shopping list to infuse flavor into the potatoes. Place them under the chicken while roasting!",
  ingredients = [
    { name: "Whole Chicken", quantity: "1.5 kg" },
    { name: "Baby Potatoes", quantity: "500 g" },
    { name: "Rosemary", quantity: "2 sprigs" },
    { name: "Lemon", quantity: "1 whole" },
    { name: "Olive Oil", quantity: "2 tbsp" },
    { name: "Garlic", quantity: "4 cloves" },
  ],
  imageUrl,
  imageSource,
  onBack,
  onFavorite,
  onStartCooking,
}: RecipeDetailsViewProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  return (
    <View style={styles.container}>
      {/* Hero Image Section */}
      <View style={styles.heroContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
          />
        ) : imageSource ? (
          <Image
            source={imageSource}
            style={styles.heroImage}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.heroImage, styles.placeholderImage]} />
        )}

        {/* Navigation Buttons */}
        <SafeAreaView edges={["top"]} style={styles.navContainer}>
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <BackArrowIcon width={24} height={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleFavorite}
              activeOpacity={0.7}
            >
              <HeartIcon
                width={24}
                height={24}
                color="white"
                filled={isFavorite}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title and Rating */}
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.ratingBadge}>
              <StarIcon width={14} height={14} color="#FBBF24" filled={false} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          {/* Metadata */}
          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <TimerIcon width={14} height={14} color="#34C759" />
              <Text style={styles.metadataText}>{prepTime}</Text>
            </View>
            <View style={styles.metadataItem}>
              <BarChartIcon width={14} height={14} color="#34C759" />
              <Text style={styles.metadataText}>{difficulty}</Text>
            </View>
            <View style={styles.metadataItem}>
              <FireIcon width={14} height={14} color="#34C759" />
              <Text style={styles.metadataText}>{calories}</Text>
            </View>
          </View>

          {/* Separator Line */}
          <View style={styles.separatorLine} />

          {/* AI Chef Tip */}
          {aiChefTip && (
            <View style={styles.aiTipContainer}>
              <View style={styles.aiTipHeader}>
                <View style={styles.aiTipHeaderLeft}>
                  <ChefHatIcon width={14} height={14} color="#34C759" />
                  <Text style={styles.aiTipTitle}>AI Chef Tip</Text>
                </View>
                <SparklesIcon width={16} height={16} color="#34C759" />
              </View>
              <View style={styles.aiTipTextContainer}>
                <Text style={styles.aiTipText}>{aiChefTip}</Text>
              </View>
            </View>
          )}

          {/* Ingredients Section */}
          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                {ingredient.quantity && (
                  <Text style={styles.ingredientQuantity}>
                    {ingredient.quantity}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Start Cooking Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startCookingButton}
            onPress={onStartCooking}
            activeOpacity={0.8}
          >
            <Text style={styles.startCookingText}>Start Cooking Mode</Text>
            <View style={styles.playIconContainer}>
              <PlayIcon width={20} height={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  heroContainer: {
    width: "100%",
    height: "45%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    backgroundColor: "#F3F4F6",
  },
  navContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    // Note: backdrop-filter is not fully supported in React Native
    // Using backgroundColor with opacity instead
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  title: {
    flex: 1,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 30,
    color: "#1F2925",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAF9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    color: "#1F2925",
  },
  metadataRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metadataText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 24,
  },
  aiTipContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#E8F8EB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 7.25,
  },
  aiTipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  aiTipHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiTipTitle: {
    width: 73.64,
    height: 20,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20,
    color: "#34C759",
  },
  aiTipTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 311,
    height: 69,
  },
  aiTipText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#1F2925",
  },
  ingredientsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2925",
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  ingredientName: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
    flex: 1,
  },
  ingredientQuantity: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  startCookingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34C759",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  startCookingText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  playIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
