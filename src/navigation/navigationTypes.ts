// src/navigation/navigationTypes.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Define your stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Introduction2: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  HabitScreen: undefined;
  MusicAndStoryTherapy: undefined;
};

// Define the navigation prop type
export type NavigationProp = StackNavigationProp<RootStackParamList>;
