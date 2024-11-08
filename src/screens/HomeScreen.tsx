import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { NavigationProp } from '../navigation/navigationTypes';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp>(); 

  useEffect(() => {
    const loadAppData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <View style={styles.featuresContainer}>
          {featureData.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.featureButton}
              onPress={
                feature.name === 'Chatbot' ? () => navigation.navigate('Chat') :
                feature.name === 'Music and Story Therapy' ? () => navigation.navigate('MusicAndStoryTherapy') : // Navigate to MusicAndStoryTherapy
                feature.name === 'Habit Recommendation' ? () => navigation.navigate('HabitScreen') :
                undefined
              }
            >
              <Text style={styles.featureText}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.trademark}>SereneAI © 2024</Text>
    </View>
  );
};

const featureData = [
  { name: 'Questionnaire' },
  { name: 'Music and Story Therapy' }, // This feature will navigate to MusicAndStoryTherapy
  { name: 'Habit Recommendation' },
  { name: 'Social Media Tracker' },
  { name: 'Resources' },
  { name: 'AI-Writing Therapist' },
  { name: 'Progress Tracker' },
  { name: 'Community' },
  { name: 'Gamification Elements' },
  { name: 'Chatbot' },
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
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  featureText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trademark: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    padding: 10,
  },
});

export default HomeScreen;
