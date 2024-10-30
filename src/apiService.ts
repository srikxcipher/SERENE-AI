// apiService.ts
import axios from 'axios';

const BASE_URL = 'http://139.84.154.10:5000/chatbot';

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
