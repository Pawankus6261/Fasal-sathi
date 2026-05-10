// SplashScreen.jsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image"; // 🚀 SVG ke liye expo-image zaroori hai
import { useRouter } from "expo-router";

// 🚀 Reanimated ko bol rahe hain ki expo-image ko animate kare
const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Smooth Fade-in aur Spring (bouncy) scale effect
    opacity.value = withTiming(1, { duration: 1200 });
    scale.value = withSpring(1);

    const timer = setTimeout(() => {
      // Using Expo Router to navigate
      router.replace("/(tabs)"); // 3 seconds ke baad Home screen par navigate karega
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF4" translucent={true} />

      <ImageBackground
        source={require("../assets/images/bg.png")} // Make sure extension is correct (.png or .jpg)
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.overlay}>
          <Animated.View style={[styles.logoContainer, animatedStyle]}>
            
            {/* 🚀 Yahan humne AnimatedExpoImage use kiya hai taaki SVG na fate */}
            <AnimatedExpoImage
              source={require("../assets/images/Logo.svg")}
              style={styles.logo}
              contentFit="contain" // resizeMode ki jagah expo-image mein contentFit hota hai
            />

            <Text style={styles.title}>Fasal Sathi</Text>

            <Text style={styles.subtitle}>
              Smart Farming. Better Tomorrow.
            </Text>
            
          </Animated.View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF4",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#14532D",
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#4D7C0F",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});