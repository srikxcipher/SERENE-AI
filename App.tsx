import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/HomeScreen';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HabitScreen from './src/screens/HabitScreen';
import MusicAndStoryTherapy from './src/screens/MusicAndStoryTherapy';
import SplashScreen from './src/screens/SplashScreen';
import Introduction2 from './src/screens/Introduction2'; // Import your new screen
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoading ? "Splash" : "Register"}>
        <Stack.Screen 
          name="Splash" 
          options={{ headerShown: false }} 
          component={SplashScreen} 
        />
        <Stack.Screen 
          name="Introduction2" 
          options={{ headerShown: false }} 
          component={Introduction2} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen 
          name="HabitScreen" 
          component={HabitScreen} 
        />
        <Stack.Screen 
          name="MusicAndStoryTherapy" 
          component={MusicAndStoryTherapy} 
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'Chatbot' }} // You can customize the title
        />
        <Stack.Screen 
        name="Habit" // Match this name with HomeScreen navigation
        component={HabitScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
