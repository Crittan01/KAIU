import { router, Stack } from "expo-router";
import { Leaf } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: Platform.OS !== 'web', // Native driver only on native
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, slideAnim]);

  const handleStart = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80",
        }}
        style={styles.backgroundImage}
        blurRadius={3}
      />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Leaf color={Colors.accent} size={48} strokeWidth={1.5} />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.brand}>KAIU</Text>
          <Text style={styles.subtitle}>Cosmética Natural</Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Nace del deseo de volver a lo esencial
          </Text>
          <Text style={styles.descriptionSecondary}>
            Rituales diarios, cuidado del hogar,{"\n"}conexión con lo natural,
            vivir con intención
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: Colors.overlay,
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(249, 239, 230, 0.15)",
    borderWidth: 1,
    borderColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  brand: {
    fontSize: 56,
    fontWeight: "300" as const,
    color: Colors.textInverse,
    letterSpacing: 12,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300" as const,
    color: Colors.accentLight,
    letterSpacing: 3,
    marginBottom: 40,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: Colors.accent,
    marginBottom: 40,
  },
  description: {
    fontSize: 20,
    fontWeight: "400" as const,
    color: Colors.textInverse,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 28,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  descriptionSecondary: {
    fontSize: 14,
    fontWeight: "300" as const,
    color: Colors.accentLight,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600" as const,
    letterSpacing: 1,
  },
});
