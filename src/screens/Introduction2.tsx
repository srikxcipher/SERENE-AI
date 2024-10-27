import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigationTypes'; // Adjust the path accordingly

const Introduction2: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation

  const handlePrevious = () => {
    navigation.navigate("Splash"); // Navigate back to SplashScreen
  };

  const handleNext = () => {
    navigation.navigate("Register"); // Navigate to the next screen
  };

  return (
    <ImageBackground 
      source={require('../assets/vecteezy_flat-design-abstract-background-soft-liquid-shapes-template_.jpg')} // Replace with your background image
      style={styles.introContainer}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          Discover Your{'\n'}Potential
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Holistic Wellness</Text>
          <Text style={styles.sectionText}>
            Our app provides tools for mental, physical, and emotional wellness, helping you achieve balance in your life.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Plans</Text>
          <Text style={styles.sectionText}>
            Tailored wellness plans designed specifically for you, making your journey more effective and enjoyable.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Support</Text>
          <Text style={styles.sectionText}>
            Connect with like-minded individuals and share your progress. You’re never alone on this journey!
          </Text>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
          <Text style={styles.prevText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background for readability
    borderRadius: 15,
    margin: 10,
  },
  welcomeText: {
    fontFamily: "Klasik, sans-serif",
    fontSize: 36,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -1.2,
    lineHeight: 40,
    marginBottom: 20,
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A00E0",
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "left",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  prevButton: {
    backgroundColor: "#fff", // Set background color to white
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", // Thin black outline
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  prevText: {
    color: "#000", // Text color inside button
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#fff", // Set background color to white
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", // Thin black outline
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  nextText: {
    color: "#000", // Text color inside button
    fontWeight: "600",
  },
});

export default Introduction2;
