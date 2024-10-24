import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigationTypes'; // Adjust the path accordingly

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation

  const handleSkip = () => {
    navigation.navigate("Register"); // Navigate to Register screen
  };

  const handleNext = () => {
    navigation.navigate("Introduction2"); // Navigate to Introduction 2 screen
  };

  return (
    <LinearGradient 
      colors={['#8E2DE2', '#4A00E0']}
      style={styles.splashContainer}
    >
      <Text style={styles.welcomeText}>
        WELCOME TO{'\n'}
        SERENE AI APP
      </Text>
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: "Klasik, sans-serif",
    fontSize: 40,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -1.2,
    lineHeight: 40,
  },
  skipButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional background color for visibility
    padding: 10,
    borderRadius: 5,
  },
  skipText: {
    color: "#000", // Change text color as needed
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional background color for visibility
    padding: 10,
    borderRadius: 5,
  },
  nextText: {
    color: "#000", // Change text color as needed
  },
});

export default SplashScreen;
