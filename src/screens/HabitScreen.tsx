import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ProgressBarAndroid, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Animations

const HabitScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [habits, setHabits] = useState([
    { name: 'Morning Meditation', progress: 0.8, streak: 5 },
    { name: 'Daily Exercise', progress: 0.6, streak: 3 },
    { name: 'Reading a Book', progress: 0.7, streak: 4 },
    { name: 'Healthy Eating', progress: 0.9, streak: 7 },
  ]);

  // Simulating loading screen for effect
  useEffect(() => {
    const loadAppData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
      setLoading(false);
    };
    loadAppData();
  }, []);

  // Habit tips
  const tips = [
    'Start small. Focus on one habit at a time.',
    'Track your progress to stay motivated.',
    'Be consistent, even if it’s just a few minutes a day.',
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b9a" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Habit Recommendations</Text>

      {/* Habit progress section */}
      <View style={styles.habitContainer}>
        {habits.map((habit, index) => (
          <Animatable.View 
            animation="fadeInUp"
            delay={index * 200} 
            key={index} 
            style={styles.habitCard}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={habit.progress}
              color="#6a1b9a"
              style={styles.progressBar}
            />
            <Text style={styles.habitProgressText}>{Math.round(habit.progress * 100)}% Completed</Text>
            <Text style={styles.habitStreak}>Streak: {habit.streak} days</Text>
          </Animatable.View>
        ))}
      </View>

      {/* Tips section */}
      <Text style={styles.tipsTitle}>Habit Tips</Text>
      {tips.map((tip, index) => (
        <Animatable.Text 
          animation="fadeInLeft"
          delay={index * 200} 
          key={index} 
          style={styles.tipText}>
          {index + 1}. {tip}
        </Animatable.Text>
      ))}

      {/* Add a Call-to-Action Button with Animation */}
      <Animatable.View animation="pulse" iterationCount="infinite">
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start a New Habit</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

// Styles for the HabitScreen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe0b2',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffe0b2',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a1b9a',
    textAlign: 'center',
  },
  habitContainer: {
    width: '100%',
    marginBottom: 20,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  habitName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  habitProgressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4caf50',
  },
  habitStreak: {
    fontSize: 14,
    color: '#ff5722',
    marginTop: 5,
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HabitScreen;
