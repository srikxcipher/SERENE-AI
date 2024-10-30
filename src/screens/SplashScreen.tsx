import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigationTypes';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [quote, setQuote] = useState<string>("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const quotes = useRef<string[]>([
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
  ]);
  const quoteIndex = useRef(0);

  useEffect(() => {
    setQuote(quotes.current[quoteIndex.current]);
    const interval = setInterval(() => {
      fadeOutAndChangeQuote();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const fadeOutAndChangeQuote = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      quoteIndex.current = (quoteIndex.current + 1) % quotes.current.length;
      setQuote(quotes.current[quoteIndex.current]);
      fadeAnim.setValue(1);
      fadeIn();
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
    navigation.navigate("Home");
  };

  const handleNext = () => {
    navigation.navigate("Introduction2");
  };

  return (
    <ImageBackground 
      source={require('../assets/pexels-njeromin-14760650.jpg')} 
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          WELCOME TO{'\n'}
          SERENE AI
        </Text>

        <View style={styles.spacer} />

        <View style={styles.quoteBox}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {quote ? (
              <Text style={styles.quoteText}>{quote}</Text>
            ) : (
              <Text style={styles.loadingText}>Loading quote...</Text>
            )}
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  welcomeText: {
    fontFamily: "Pacifico", // Change this to your chosen font
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -1.2,
    lineHeight: 50,
    textShadowColor: "rgba(0, 0, 0, 0.7)", // Dark shadow for outline effect
    textShadowOffset: { width: 2, height: 2 }, // Adjust for outline effect
    textShadowRadius: 3, // Blur radius for the shadow
  },
  spacer: {
    height: 180,
  },
  quoteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 0,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  quoteText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 10,
    fontStyle: "italic",
    fontFamily: "Cursive, sans-serif",
    // No outline effect on quote text
  },
  loadingText: {
    marginVertical: 20,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  skipButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 22,
    flex: 1,
    marginRight: 100,
  },
  skipText: {
    color: "#000",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 22,
    flex: 1,
    marginLeft: 100,
  },
  nextText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default SplashScreen;
