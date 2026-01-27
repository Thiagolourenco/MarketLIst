import { Button, Switch } from "@/src/core/ui";
import {
  CameraSmallIcon,
  CheckGreenIcon,
  ChevronRightIcon,
  HistoryIcon,
  NotificationIcon,
} from "@/src/core/ui/icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileViewProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  currentPlan?: "FREE" | "PRO";
  onLogOut?: () => void;
  onEditProfile?: () => void;
  onUpgrade?: () => void;
  onEditPreferences?: () => void;
  onMealHistory?: () => void;
}

export function ProfileView({
  userName = "Sarah Jenkins",
  userEmail = "sarah.j@example.com",
  userAvatar,
  currentPlan = "FREE",
  onLogOut,
  onEditProfile,
  onUpgrade,
  onEditPreferences,
  onMealHistory,
}: ProfileViewProps) {
  const [mealOfTheDayEnabled, setMealOfTheDayEnabled] = useState(true);

  const preferences = [
    { label: "Vegetarian", color: "#34C759", bgColor: "#E8F8EB" },
    { label: "Low Carb", color: "#FF9500", bgColor: "#FFF4E6" },
    { label: "Budget Friendly", color: "#007AFF", bgColor: "#E6F2FF" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity onPress={onLogOut} activeOpacity={0.7}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar }}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.cameraButton} activeOpacity={0.7}>
              <CameraSmallIcon width={12} height={12} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
            <TouchableOpacity onPress={onEditProfile} activeOpacity={0.7}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
          <View style={styles.subscriptionCard}>
            {/* Decorative blob with blur effect - using multiple layers to simulate blur */}
            <View style={styles.decorativeBlob}>
              {/* Outer blur layer */}
              <View style={styles.decorativeBlobOuter} />
              {/* Middle blur layer */}
              <View style={styles.decorativeBlobMiddle} />
              {/* Inner core */}
              <View style={styles.decorativeBlobInner} />
            </View>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.currentPlanText}>Current Plan</Text>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>{currentPlan}</Text>
              </View>
            </View>
            <Text style={styles.premiumTitle}>Unlock Premium</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <CheckGreenIcon width={14} height={14} color="#22C55E" />
                <Text style={styles.featureText}>Unlimited Meal Plans</Text>
              </View>
              <View style={styles.featureItem}>
                <CheckGreenIcon width={14} height={14} color="#22C55E" />
                <Text style={styles.featureText}>AI Recipe Generation</Text>
              </View>
            </View>
            <Button
              title="Upgrade to Pro"
              onPress={() => onUpgrade?.()}
              variant="primary"
              style={styles.upgradeButton}
            />
          </View>
        </View>

        {/* Food Preferences Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FOOD PREFERENCES</Text>
            <TouchableOpacity onPress={onEditPreferences} activeOpacity={0.7}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.preferencesContainer}>
            {preferences.map((pref, index) => (
              <View
                key={index}
                style={[
                  styles.preferenceTag,
                  { backgroundColor: pref.bgColor },
                ]}
              >
                <Text style={[styles.preferenceText, { color: pref.color }]}>
                  {pref.label}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addPreferenceButton}
              activeOpacity={0.7}
            >
              <Text style={styles.addPreferenceText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* General Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          <View style={styles.settingsCard}>
            {/* Meal History */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={onMealHistory}
              activeOpacity={0.7}
            >
              <View style={styles.historyIconContainer}>
                <HistoryIcon width={16} height={16} color="#3B82F6" />
              </View>
              <Text style={styles.settingText}>Meal History</Text>
              <ChevronRightIcon width={16} height={16} color="#D1D5DB" />
            </TouchableOpacity>

            {/* Meal of the Day */}
            <View style={[styles.settingItem, styles.settingItemLast]}>
              <View style={styles.notificationIconContainer}>
                <NotificationIcon width={16} height={16} color="#EAB308" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Meal of the Day</Text>
                <Text style={styles.settingSubtext}>
                  Daily notification at 5 PM
                </Text>
              </View>
              <Switch
                value={mealOfTheDayEnabled}
                onValueChange={setMealOfTheDayEnabled}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}> and </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.versionText}>Version 1.0.2 (Build 45)</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerTitle: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 28,
    color: "#1F2937",
  },
  logOutText: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#EF4444",
    textAlign: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 128,
    marginTop: 16,
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    width: 80,
    height: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.002)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  avatarInitial: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    color: "#6B7280",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    padding: 6,
    zIndex: 1,
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
    color: "#1F2925",
  },
  userEmail: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  editProfileText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#34C759",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  editText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#34C759",
  },
  subscriptionCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
  },
  decorativeBlob: {
    position: "absolute",
    width: 128,
    height: 128,
    right: -40,
    top: -40,
    borderRadius: 9999,
    zIndex: 0,
    overflow: "visible",
  },
  decorativeBlobOuter: {
    position: "absolute",
    width: 192,
    height: 192,
    left: -32,
    top: -32,
    backgroundColor: "#22C55E",
    opacity: 0.1,
    borderRadius: 9999,
  },
  decorativeBlobMiddle: {
    position: "absolute",
    width: 160,
    height: 160,
    left: -16,
    top: -16,
    backgroundColor: "#22C55E",
    opacity: 0.2,
    borderRadius: 9999,
  },
  decorativeBlobInner: {
    position: "absolute",
    width: 128,
    height: 128,
    left: 0,
    top: 0,
    backgroundColor: "#22C55E",
    opacity: 0.3,
    borderRadius: 9999,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentPlanText: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#D1D5DB",
  },
  planBadge: {
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  planBadgeText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
  },
  premiumTitle: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    color: "#FFFFFF",
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#D1D5DB",
  },
  upgradeButton: {
    marginTop: 8,
  },
  preferencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
  },
  preferenceTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  preferenceText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
  },
  addPreferenceButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
  },
  addPreferenceText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 24,
    color: "#6B7280",
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  historyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  notificationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: "#FEFCE8",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  settingContent: {
    flex: 1,
    gap: 4,
  },
  settingText: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2937",
  },
  settingSubtext: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
    gap: 8,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerLink: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#9CA3AF",
    textDecorationLine: "underline",
  },
  footerSeparator: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#9CA3AF",
  },
  versionText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#D1D5DB",
  },
});
