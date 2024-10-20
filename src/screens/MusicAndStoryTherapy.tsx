import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

const MusicAndStoryTherapy: React.FC = () => {
  return (
    <ImageBackground
    source={require('../assets/rohit-choudhari-S6KP_UX2O9s-unsplash.jpg')} // Adjust the path as needed
    style={styles.background}
    >
  

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Music & Story Therapy</Text>

        {/* Recommendations Section */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommended Music</Text>
          {musicRecommendations.map((item, index) => (
            <TouchableOpacity key={index} style={styles.recommendationBox}>
              <Text style={styles.recommendationText}>{item.title}</Text>
              <Text style={styles.recommendationSubText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommended Stories</Text>
          {storyRecommendations.map((item, index) => (
            <TouchableOpacity key={index} style={styles.recommendationBox}>
              <Text style={styles.recommendationText}>{item.title}</Text>
              <Text style={styles.recommendationSubText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Sample data for recommendations
const musicRecommendations = [
  { title: 'Calm Ocean Waves', description: 'Relaxing sounds of ocean waves to ease your mind.' },
  { title: 'Peaceful Piano Melodies', description: 'Soothing piano music for relaxation.' },
  { title: 'Gentle Rain Sounds', description: 'Enjoy the calming sounds of a gentle rain.' },
];

const storyRecommendations = [
  { title: 'The Calm Forest', description: 'A relaxing journey through a peaceful forest.' },
  { title: 'Dreamy Night Tales', description: 'Soothing stories to help you sleep.' },
  { title: 'The Whispering Wind', description: 'A story that takes you on an adventure with the wind.' },
];

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  recommendationsSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffd700',
    marginBottom: 10,
    textAlign: 'center',
  },
  recommendationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationSubText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MusicAndStoryTherapy;
