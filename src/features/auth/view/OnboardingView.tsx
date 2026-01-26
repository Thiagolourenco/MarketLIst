import {
  Badge,
  Button,
  Indicator,
  InsightIcon,
  Typography,
} from "@/src/core/ui";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingSlide {
  id: number;
  image?: any;
  badge?: string;
  title: string;
  description: string;
  quote?: {
    icon?: string;
    text: string;
  };
  showSkip?: boolean;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    image: require("@/assets/onboarding/onboardingOne.png"),
    badge: "FEATURE HIGHLIGHT",
    title: "Smart Grocery Lists in Seconds",
    description:
      "Create your shopping list effortlessly. Just type, and we organize everything by aisle.",
    showSkip: true,
  },
  {
    id: 2,
    image: require("@/assets/onboarding/onboardingTwo.png"),
    badge: "FEATURE HIGHLIGHT",
    title: "From Bag to Bowl",
    description:
      "Mark what you bought, and our AI instantly creates recipes based on your actual ingredients.",
    showSkip: true,
  },
  {
    id: 3,
    image: require("@/assets/onboarding/onboardingThree.png"),
    title: "Your Week, Organized",
    description:
      "We've got the planning covered. No more stressing about what to cook tonight.",
    quote: {
      text: "\"It's like having a personal chef who knows exactly what's in your fridge.\"",
    },
    showSkip: false,
  },
];

export function OnboardingView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values for last slide
  const quoteBoxOpacity = useSharedValue(0);
  const quoteBoxScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
    
    // Trigger animation when reaching the last slide
    if (index === onboardingSlides.length - 1) {
      // Animate quote box - faster
      quoteBoxOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
      quoteBoxScale.value = withDelay(100, withSpring(1, { damping: 15, stiffness: 150 }));
      
      // Animate button - faster
      buttonOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
      buttonTranslateY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 150 }));
    } else {
      // Reset animations when leaving last slide
      quoteBoxOpacity.value = 0;
      quoteBoxScale.value = 0.8;
      buttonOpacity.value = 0;
      buttonTranslateY.value = 20;
    }
  };
  
  useEffect(() => {
    // Animate on initial mount if already on last slide
    if (currentIndex === onboardingSlides.length - 1) {
      quoteBoxOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
      quoteBoxScale.value = withDelay(100, withSpring(1, { damping: 15, stiffness: 150 }));
      buttonOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
      buttonTranslateY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 150 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleContinue = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // Navigate to sign-in or home
      router.replace("/(auth)/sign-in");
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/sign-in");
  };

  const currentSlide = onboardingSlides[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Main ScrollView for carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide) => (
          <View key={slide.id} style={styles.slideContainer}>
            {/* Image Area */}
            <View style={styles.imageArea}>
              <View style={styles.imageContainer}>
                {slide.image && (
                  <Image
                    source={slide.image}
                    style={styles.onboardingImage}
                    contentFit="cover"
                    transition={200}
                  />
                )}
                <View style={styles.imageFade} />
              </View>
            </View>

            {/* Indicators - Between image and content */}
            <View style={styles.indicators}>
              {onboardingSlides.map((_, index) => (
                <View key={index} style={index > 0 && styles.indicatorSpacing}>
                  <Indicator active={index === currentIndex} />
                </View>
              ))}
            </View>

            {/* Content Area */}
            <View style={styles.contentArea}>
              {/* Badge */}
              {slide.badge && (
                <View style={styles.badgeContainer}>
                  <Badge text={slide.badge} />
                </View>
              )}

              {/* Title */}
              <View style={styles.titleContainer}>
                <Typography variant="title">{slide.title}</Typography>
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Typography variant="description">
                  {slide.description}
                </Typography>
              </View>

              {/* Quote Box (for screen 3) */}
              {slide.quote && (
                <View style={styles.quoteContainer}>
                  <Animated.View
                    style={[
                      styles.quoteBox,
                      currentIndex === onboardingSlides.length - 1 && {
                        opacity: quoteBoxOpacity,
                        transform: [{ scale: quoteBoxScale }],
                      },
                    ]}
                  >
                    <InsightIcon width={20} height={20} color="#34C759" />
                    <Typography variant="body" style={styles.quoteText}>
                      {slide.quote.text}
                    </Typography>
                  </Animated.View>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Indicators */}

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                marginBottom:
                  currentIndex === onboardingSlides.length - 1 ? 32 : 0,
              },
              currentIndex === onboardingSlides.length - 1 && {
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
              },
            ]}
          >
            <Button
              title={
                currentIndex === onboardingSlides.length - 1
                  ? "Get Started"
                  : "Continue"
              }
              onPress={handleContinue}
              variant="primary"
            />
          </Animated.View>
          {currentSlide.showSkip && (
            <View style={[styles.buttonWrapper, styles.skipButtonWrapper]}>
              <Button title="Skip" onPress={handleSkip} variant="skip" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  _slideContainer: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // backgroundColor: "brown",
    marginTop: -32,
  },
  get slideContainer() {
    return this._slideContainer;
  },
  set slideContainer(value) {
    this._slideContainer = value;
  },
  imageArea: {
    width: "100%",
    height: 437.25,
    isolation: "isolate",
    backgroundColor: "red",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "green",
  },
  onboardingImage: {
    width: "100%",
    height: "100%",
  },
  imageFade: {
    flex: 1,
    backgroundColor: "yellow",
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  indicatorSpacing: {
    marginLeft: 8,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  badgeContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  descriptionContainer: {
    // marginBottom: 24,
    width: "100%",
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteContainer: {
    width: "100%",
    marginTop: 16,
    alignItems: "center",
  },
  quoteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    gap: 12,
    width: 323,
    minHeight: 72,
    backgroundColor: "#EAFBF1",
    borderRadius: 12,
    alignSelf: "stretch",
  },
  quoteText: {
    flex: 1,
    fontStyle: "italic",
    color: "#1F2937",
  },
  bottomSection: {
    paddingHorizontal: 32,
    // paddingBottom: 40,
    // paddingTop: 0,
    backgroundColor: "#FFFFFF",
  },
  buttonsContainer: {
    width: "100%",
    // marginTop: 32,
    // backgroundColor: "purple",
  },
  buttonWrapper: {
    // backgroundColor: "pink",
    width: "100%",
    alignItems: "center",
  },
  skipButtonWrapper: {
    marginTop: 16,
    marginBottom: 32,
  },
});
