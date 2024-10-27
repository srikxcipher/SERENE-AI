import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigationTypes'; // Adjust the path accordingly

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the typed navigation
  const [quote, setQuote] = useState<string>("");
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity
  const quotes = useRef<string[]>([
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
  ]); // Replace with your own quotes or fetch them from an API
  const quoteIndex = useRef(0); // Index for the current quote

  useEffect(() => {
    // Set the initial quote
    setQuote(quotes.current[quoteIndex.current]);

    const interval = setInterval(() => {
      fadeOutAndChangeQuote();
    }, 20000); // Change quote every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const fadeOutAndChangeQuote = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Change quote and fade in
      quoteIndex.current = (quoteIndex.current + 1) % quotes.current.length; // Update index
      setQuote(quotes.current[quoteIndex.current]);
      fadeAnim.setValue(1); // Reset opacity to 1
      fadeIn(); // Start fade in
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

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

      <View style={styles.spacer} />

      {/* Quote Box with Fade Animation */}
      <Animated.View style={[styles.quoteBox, { opacity: fadeAnim }]}>
        {quote ? (
          <Text style={styles.quoteText}>{quote}</Text>
        ) : (
          <Text style={styles.loadingText}>Loading quote...</Text>
        )}
      </Animated.View>

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
    padding: 20,
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
  spacer: {
    height: 20, // Adjust space as needed
  },
  quoteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 10,
    padding: 20,
    margin: 20,
    width: '90%', // Responsive width
    maxWidth: 400, // Max width for larger screens
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  quoteText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
    fontStyle: "italic",
    fontFamily: "Cursive, sans-serif",
  },
  loadingText: {
    marginVertical: 20,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  skipButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  skipText: {
    color: "#000",
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  nextText: {
    color: "#000",
  },
});

export default SplashScreen;
