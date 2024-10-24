import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigationTypes'; // Adjust the path accordingly

const Introduction2: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation

  const handleSkip = () => {
    navigation.navigate("Register"); // Navigate to Register screen
  };

  const handleNext = () => {
    navigation.navigate("Register"); // Replace with the actual next screen name
  };

  return (
    <LinearGradient 
      colors={['#4A00E0', '#8E2DE2']} // Different gradient colors for variety
      style={styles.introContainer}
    >
      <Text style={styles.welcomeText}>
        Discover Your{'\n'}
        Potential
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
  introContainer: {
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

export default Introduction2;
