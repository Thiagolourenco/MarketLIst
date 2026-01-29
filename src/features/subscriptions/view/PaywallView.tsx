import { Button, Typography } from "@/src/core/ui";
import {
  BookmarkIcon,
  CameraIcon,
  FilterIcon,
  InfinityIcon,
  SmartKitchenIcon,
} from "@/src/core/ui/icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PlanCard } from "../components";

interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

const features: FeatureItem[] = [
  {
    icon: <InfinityIcon />,
    text: "Unlimited AI Meal Plans",
  },
  {
    icon: <FilterIcon />,
    text: "Advanced Recipe Filters",
  },
  {
    icon: <CameraIcon />,
    text: "Scan Ingredients from Your Pantry",
  },
  {
    icon: <BookmarkIcon />,
    text: "Save Favorite Recipes",
  },
];

export function PaywallView() {
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">(
    "annual",
  );

  const handleStartTrial = () => {
    // TODO: Implement subscription logic
    console.log("Starting trial with plan:", selectedPlan);
    // Navigate to home after subscription
    router.push("/(app)/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header Icon */}
          <View style={styles.iconContainer}>
            <SmartKitchenIcon width={48} height={48} color="white" />
          </View>

          {/* Title */}
          <Typography variant="title" style={styles.title}>
            Unlock Your Smart Kitchen
          </Typography>

          {/* Description */}
          <Typography variant="description" style={styles.description}>
            Go Pro to save time, reduce food waste, and enjoy endless meal
            inspiration.
          </Typography>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>{feature.icon}</View>
                <Typography variant="body" style={styles.featureText}>
                  {feature.text}
                </Typography>
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansContainer}>
            <PlanCard
              title="Annual Plan"
              price="R$89,99"
              period="year"
              discount="Save 50%"
              isSelected={selectedPlan === "annual"}
              showMostPopular={true}
              onPress={() => setSelectedPlan("annual")}
            />
            <PlanCard
              title="Monthly Plan"
              price="R$9.99"
              period="month"
              isSelected={selectedPlan === "monthly"}
              onPress={() => setSelectedPlan("monthly")}
            />
          </View>

          {/* CTA Button */}
          <Button
            title="Start My 7-Day Free Trial"
            onPress={handleStartTrial}
            variant="cta"
            style={styles.ctaButton}
          />

          {/* Footer Legal Links */}
          <View style={styles.footer}>
            <Typography style={styles.footerText}>
              7 days free, then R$89,99/year. Cancel anytime.
            </Typography>
            <View style={styles.legalLinks}>
              <TouchableOpacity activeOpacity={0.7}>
                <Typography style={styles.legalLink}>Terms</Typography>
              </TouchableOpacity>
              <Typography style={styles.legalSeparator}> & </Typography>
              <TouchableOpacity activeOpacity={0.7}>
                <Typography style={styles.legalLink}>Privacy Policy</Typography>
              </TouchableOpacity>
              <Typography style={styles.legalSeparator}>.</Typography>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#34C759",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    width: 272.6,
    height: 72,
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 36,
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    width: 335.06,
    height: 48,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#8A8A8E",
    textAlign: "center",
    marginBottom: 32,
  },
  featuresContainer: {
    width: "100%",
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#EAFBF1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#1C1C1E",
  },
  plansContainer: {
    width: "100%",
    marginTop: 32,
    marginBottom: 24,
  },
  ctaButton: {
    width: 345,
    marginBottom: 16,
  },
  footer: {
    width: 345,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  legalLink: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#1C1C1E",
    textDecorationLine: "underline",
  },
  legalSeparator: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#1C1C1E",
  },
});
