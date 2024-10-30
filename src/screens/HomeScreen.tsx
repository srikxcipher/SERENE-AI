import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { NavigationProp } from '../navigation/navigationTypes'; // Adjust the path to your navigationTypes file

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp>(); 

  useEffect(() => {
    const loadAppData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
      setLoading(false);
    };
    loadAppData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to SERENE AI!</Text>
      <View style={styles.featuresContainer}>
        {featureData.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.featureBox, { backgroundColor: feature.color }]}
            onPress={feature.name === 'Chatbot' ? () => navigation.navigate('Chat') : undefined} // Use navigation to go to Chat
          >
            <Text style={styles.featureText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Feature data with distinct colors, including a Chatbot feature
const featureData = [
  { name: 'Questionnaire', color: '#FF6F61' },
  { name: 'Music and Story Therapy', color: '#6A5ACD' },
  { name: 'Habit\nRecommenda-tion', color: '#FF8C00' },
  { name: 'Social Media Tracker', color: '#20B2AA' },
  { name: 'Resources', color: '#DC143C' },
  { name: 'AI-Writing Therapist', color: '#8A2BE2' },
  { name: 'Progress Tracker', color: '#FFD700' },
  { name: 'Community', color: '#FF4500' },
  { name: 'Gamification Elements', color: '#32CD32' },
  { name: 'Chatbot', color: '#1E90FF' }, // Chatbot feature
];

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  featureBox: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%', // Adjusted width to fit 2 boxes side by side
    height: 100, // Set a fixed height for uniformity
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  featureText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold', // Make text bold
    fontSize: 16, // Adjusted font size for better readability
  },
});

export default HomeScreen;
