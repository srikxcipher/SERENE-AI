import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/HomeScreen';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HabitScreen from './src/screens/HabitScreen';
import MusicAndStoryTherapy from './src/screens/MusicAndStoryTherapy'

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HabitScreen" component={HabitScreen} />
        <Stack.Screen name="MusicAndStoryTherapy" component={MusicAndStoryTherapy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

