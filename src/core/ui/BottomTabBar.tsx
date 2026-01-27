import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CalendarIcon, HomeIcon, ListIcon, ProfileIcon } from "./icons";

export type TabRoute = "home" | "list" | "calendar" | "profile";

interface BottomTabBarProps {
  activeRoute: TabRoute;
  onRouteChange: (route: TabRoute) => void;
}

interface AnimatedTabItemProps {
  route: TabRoute;
  isActive: boolean;
  onPress: () => void;
  scale: ReturnType<typeof useSharedValue<number>>;
  opacity: ReturnType<typeof useSharedValue<number>>;
}

const AnimatedTabItem = React.memo(({ route, isActive, onPress, scale, opacity }: AnimatedTabItemProps) => {
  const getIcon = (isActive: boolean) => {
    const color = isActive ? "#FFFFFF" : "#6B7280";
    switch (route) {
      case "home":
        return <HomeIcon width={20} height={20} color={color} />;
      case "list":
        return <ListIcon width={20} height={20} color={color} />;
      case "calendar":
        return <CalendarIcon width={20} height={20} color={color} />;
      case "profile":
        return <ProfileIcon width={20} height={20} color={color} />;
    }
  };

  const activeTabStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const inactiveTabStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: 1 - opacity.value,
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.activeTab,
          activeTabStyle,
          { position: isActive ? "relative" : "absolute" },
        ]}
      >
        {getIcon(true)}
      </Animated.View>
      <Animated.View
        style={[
          styles.inactiveTab,
          inactiveTabStyle,
          { position: isActive ? "absolute" : "relative" },
        ]}
      >
        {getIcon(false)}
      </Animated.View>
    </TouchableOpacity>
  );
});

AnimatedTabItem.displayName = "AnimatedTabItem";

export function BottomTabBar({
  activeRoute,
  onRouteChange,
}: BottomTabBarProps) {
  const tabs: { route: TabRoute }[] = [
    { route: "home" },
    { route: "list" },
    { route: "calendar" },
    { route: "profile" },
  ];

  // Animation values for each tab
  const homeScale = useSharedValue(activeRoute === "home" ? 1 : 0.8);
  const listScale = useSharedValue(activeRoute === "list" ? 1 : 0.8);
  const calendarScale = useSharedValue(activeRoute === "calendar" ? 1 : 0.8);
  const profileScale = useSharedValue(activeRoute === "profile" ? 1 : 0.8);

  const homeOpacity = useSharedValue(activeRoute === "home" ? 1 : 0);
  const listOpacity = useSharedValue(activeRoute === "list" ? 1 : 0);
  const calendarOpacity = useSharedValue(activeRoute === "calendar" ? 1 : 0);
  const profileOpacity = useSharedValue(activeRoute === "profile" ? 1 : 0);

  // Update animations when activeRoute changes
  useEffect(() => {
    const springConfig = {
      damping: 15,
      stiffness: 150,
    };

    homeScale.value = withSpring(activeRoute === "home" ? 1 : 0.8, springConfig);
    listScale.value = withSpring(activeRoute === "list" ? 1 : 0.8, springConfig);
    calendarScale.value = withSpring(activeRoute === "calendar" ? 1 : 0.8, springConfig);
    profileScale.value = withSpring(activeRoute === "profile" ? 1 : 0.8, springConfig);

    homeOpacity.value = withSpring(activeRoute === "home" ? 1 : 0, springConfig);
    listOpacity.value = withSpring(activeRoute === "list" ? 1 : 0, springConfig);
    calendarOpacity.value = withSpring(activeRoute === "calendar" ? 1 : 0, springConfig);
    profileOpacity.value = withSpring(activeRoute === "profile" ? 1 : 0, springConfig);
  }, [activeRoute, homeScale, listScale, calendarScale, profileScale, homeOpacity, listOpacity, calendarOpacity, profileOpacity]);

  const getScale = (route: TabRoute) => {
    switch (route) {
      case "home": return homeScale;
      case "list": return listScale;
      case "calendar": return calendarScale;
      case "profile": return profileScale;
    }
  };

  const getOpacity = (route: TabRoute) => {
    switch (route) {
      case "home": return homeOpacity;
      case "list": return listOpacity;
      case "calendar": return calendarOpacity;
      case "profile": return profileOpacity;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blurView}>
        <View style={styles.content}>
          {tabs.map((tab) => {
            const isActive = activeRoute === tab.route;
            return (
              <AnimatedTabItem
                key={tab.route}
                route={tab.route}
                isActive={isActive}
                onPress={() => onRouteChange(tab.route)}
                scale={getScale(tab.route)}
                opacity={getOpacity(tab.route)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  blurView: {
    width: 345,
    maxWidth: 384,
    height: 66,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 22.87,
    paddingVertical: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: 64,
    height: 40,
    backgroundColor: "#34C759",
    borderRadius: 9999,
  },
  inactiveTab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: 40,
    height: 40,
  },
});
