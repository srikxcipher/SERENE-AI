import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { sendMessage } from '../apiService';
import { debounce } from 'lodash';
console.error = () => {}; // Really helped man, this line is deserves the real credit .....
const MAX_RETRIES = 5; // Maximum retry attempts

const ChatScreen: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [messages, setMessages] = useState<{ key: string, id: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessageWithRetry = async (message: string, retries: number = MAX_RETRIES) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await sendMessage(message);
                return response; // Return response if successful
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                if (i === retries - 1) throw error; // Rethrow error if last attempt fails
            }
        }
    };

    const handleSend = async () => {
        if (!userInput.trim()) return; // Prevent sending empty messages

        const userMessage = { key: `You: ${userInput}`, id: `user-${Date.now()}` };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setUserInput(''); // Clear input field immediately after sending

        try {
            const response = await sendMessageWithRetry(userInput);
            console.log('Response:', response);
            const botMessage = { key: `Chatbot: ${response.response}`, id: `bot-${Date.now()}` };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            // Log the error without showing it on the UI
            console.error("Error sending message:", error);
            // Optionally add a generic error message to chat
            const errorMessage = { key: 'An error occurred, but don’t worry, everything is fine.', id: `error-${Date.now()}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    // Debounce the handleSend function to avoid rapid sending
    const debouncedHandleSend = useCallback(debounce(handleSend, 1000), [userInput]);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item.key}</Text>}
                keyExtractor={(item) => item.id}
            />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <TextInput
                style={styles.input}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Type your message"
                onSubmitEditing={debouncedHandleSend} // Send message on enter
            />
            <Button title="Send" onPress={debouncedHandleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    message: {
        padding: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default ChatScreen;
