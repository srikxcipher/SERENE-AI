// apiService.ts
import axios from 'axios';

const BASE_URL = 'http://139.84.154.10:5000/chatbot';
const HABIT_URL = 'http://139.84.154.10:5000/recommend_habit';


export const sendMessage = async (message: string) => {
    try {
        const response = await axios.post(`${BASE_URL}`, { message });
        console.log('Response:', response.data); // Log the response
        return response.data; // Adjust based on your API response structure
    } catch (error) {
        console.error('Error in sendMessage:', error); // Log the error
        throw error; // Rethrow the error to handle it in ChatScreen
    }
};
export const getHabitRecommendation = async (exerciseFreq: string, socialMediaHours: string, stressLevel: string, mindfulnessFreq: string) => {
    try {
        console.log('Sending request to Habit API...');
        const response = await axios.post(`${HABIT_URL}`, {
            exercise_frequency: exerciseFreq,
            social_media_hours: socialMediaHours,
            stress_level: stressLevel,
            mindfulness_frequency: mindfulnessFreq
        });

        console.log('Response from Habit API:', response.data);
        return response.data.recommended_habit; 
    } catch (error) {
        console.error('Error in getHabitRecommendation:', error);
        throw error;
    }
};