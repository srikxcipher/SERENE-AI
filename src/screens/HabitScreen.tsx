import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, Card, Title, Paragraph, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { getHabitRecommendation } from '../apiService';

console.error = () => {};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        accent: '#03dac4',
    },
};

const HabitScreen: React.FC = () => {
    const [exerciseFreq, setExerciseFreq] = useState('');
    const [socialMediaHours, setSocialMediaHours] = useState('');
    const [stressLevel, setStressLevel] = useState('');
    const [mindfulnessFreq, setMindfulnessFreq] = useState('');
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        const exerciseOptions = ['Daily', 'A few times a week', 'Rarely', 'Never'];
        const socialMediaOptions = ['Less than 1 hour', '1-2 hours', '2-3 hours', 'More than 3 hours'];
        const stressOptions = ['Low', 'Moderate', 'High'];
        const mindfulnessOptions = ['Daily', 'A few times a week', 'Rarely', 'Never'];

        if (!exerciseOptions.includes(exerciseFreq)) {
            showAlert('exercise frequency', exerciseOptions);
            return false;
        }
        if (!socialMediaOptions.includes(socialMediaHours)) {
            showAlert('social media hours', socialMediaOptions);
            return false;
        }
        if (!stressOptions.includes(stressLevel)) {
            showAlert('stress level', stressOptions);
            return false;
        }
        if (!mindfulnessOptions.includes(mindfulnessFreq)) {
            showAlert('mindfulness frequency', mindfulnessOptions);
            return false;
        }
        return true;
    };

    const showAlert = (parameter: string, options: string[]) => {
        Alert.alert(
            `Invalid ${parameter}`,
            `Please enter a valid ${parameter}. Use one of the following options:\n\n${options.join(', ')}`,
            [{ text: 'OK' }]
        );
    };

    const retryFetchRecommendation = async (attempts: number = 5) => {
        for (let i = 0; i < attempts; i++) {
            try {
                const habit = await getHabitRecommendation(
                    exerciseFreq,
                    socialMediaHours,
                    stressLevel,
                    mindfulnessFreq
                );

                console.log('Received recommendation:', habit); // Log the returned recommendation
                setRecommendation(habit);
                return; // Exit the function if successful
            } catch (error) {
                console.error("Attempt failed:", error);
                // Implement exponential backoff
                const waitTime = Math.pow(2, i) * 500; // 2^i seconds
                await new Promise(res => setTimeout(res, waitTime)); // Wait before retrying
            }
        }
        // If all attempts fail, you can clear the recommendation or handle it differently if needed
        setRecommendation(null);
    };

    const handleRecommendation = async () => {
        setLoading(true);

        // Validate inputs before making API call
        if (!validateInputs()) {
            setLoading(false);
            return; // Stop execution if inputs are invalid
        }

        await retryFetchRecommendation();
        setLoading(false); // Stop loading regardless of success or failure
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>Get Your Habit Recommendation</Title>
                        <TextInput 
                            style={styles.input} 
                            label="Exercise Frequency"
                            placeholder="How often do you exercise? (Daily/A few times a week/Rarely/Never)" 
                            value={exerciseFreq} 
                            onChangeText={setExerciseFreq} 
                        />
                        <TextInput 
                            style={styles.input} 
                            label="Social Media Hours"
                            placeholder="How many hours do you spend on social media? (Less than 1 hour/1-2 hours/2-3 hours/More than 3 hours)" 
                            value={socialMediaHours} 
                            onChangeText={setSocialMediaHours} 
                        />
                        <TextInput 
                            style={styles.input} 
                            label="Stress Level"
                            placeholder="How would you rate your stress level? (Low/Moderate/High)" 
                            value={stressLevel} 
                            onChangeText={setStressLevel} 
                        />
                        <TextInput 
                            style={styles.input} 
                            label="Mindfulness Frequency"
                            placeholder="How often do you practice mindfulness? (Daily/A few times a week/Rarely/Never)" 
                            value={mindfulnessFreq} 
                            onChangeText={setMindfulnessFreq} 
                        />
                        
                        <Button mode="contained" onPress={handleRecommendation} style={styles.button}>
                            Get Recommendation
                        </Button>

                        {loading && <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />}
                        
                        {recommendation && (
                            <Card style={styles.resultContainer}>
                                <Card.Content>
                                    <Paragraph style={styles.resultText}>Recommended Habit: {recommendation}</Paragraph>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Content>
                </Card>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f3f4f6',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: theme.colors.primary,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e0f7fa',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 18,
        color: '#00796b',
        textAlign: 'center',
    },
});

export default HabitScreen;