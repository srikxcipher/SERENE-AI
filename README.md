# SERENE-AI: Wellness Assistant (React Native Android App)

## Overview

**SERENE-AI** is a comprehensive wellness assistant built with React Native and TypeScript, designed to help users improve their mental and physical well-being. This app integrates with the **SERENE-AI** backend, providing users with personalized habit recommendations, mood-based music suggestions, therapeutic writing prompts, and a sentiment-aware chatbot. Whether you're seeking to create a healthy routine, engage in introspective writing, or just listen to music that matches your mood, **SERENE-AI** has you covered.

This app provides users with a seamless, AI-powered experience on Android, allowing for real-time interactions with wellness models hosted via API. The user interface is designed for simplicity and ease of use, with a focus on intuitive navigation and engaging features.

---

## Features

- **Personalized Habit Recommendations**: Tailored suggestions based on your input (e.g., exercise frequency, stress level, mindfulness practices).
- **Mood-Based Music Recommendations**: Music suggestions to match your mood—whether you're feeling happy, sad, or neutral.
- **AI Writing Therapist**: Personalized writing prompts based on your current emotional state to help you reflect or improve your mood.
- **Sentiment Analysis Chatbot**: A chatbot that analyzes the sentiment of your input and responds with positive, neutral, or supportive messages.
- **Responsive and Fluid Design**: A smooth and engaging user interface optimized for Android devices.

---

## Screens in the App

### 1. **Home Screen**
   - Provides an overview of the user's current wellness journey.
   - Quick access to various features like habit recommendations, music, writing prompts, and the chatbot.

### 2. **Habit Recommendation Screen**
   - User inputs their exercise frequency, stress level, social media usage, and mindfulness practice to receive tailored wellness habit suggestions.

### 3. **Music Recommendation Screen**
   - Based on mood input (e.g., happy, sad, stressed), users receive a curated list of songs from the backend API.

### 4. **Writing Therapist Screen**
   - Users input their mood (good, neutral, or bad), and the app provides personalized writing prompts to help them explore their emotions.

### 5. **Chatbot Screen**
   - A friendly AI chatbot interacts with users. The bot's responses are based on the sentiment of the user's message (positive, neutral, or negative).

---

## Setup Instructions

To get **SERENE-AI** running on your local machine or Android device, follow these steps:

### 1. **Clone the Repository**

Clone the project from GitHub:

```bash
git clone https://github.com/srikxcipher/SERENE-AI-app.git
cd SERENE-AI-app
```




This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

Usage Instructions
------------------

### 1\. **Chatbot Screen**

-   Enter a message in the chatbot interface.
-   The app uses sentiment analysis to understand the mood of the text and respond accordingly (positive, neutral, or negative).
-   For example, if you type "I feel great today!", the chatbot may respond with "That's awesome! Keep it up!"

### 2\. **Habit Recommendation Screen**

-   Input details such as:
    -   **Exercise Frequency**: Daily, Weekly, Occasionally
    -   **Social Media Hours**: How much time you spend on social media
    -   **Stress Level**: Low, Medium, High
    -   **Mindfulness Frequency**: Daily, Weekly, Occasionally
-   Based on your input, the app will recommend habits to improve your wellness (e.g., daily meditation, more exercise).

### 3\. **Mood-Based Music Recommendations**

-   Select your current mood (Happy, Sad, Neutral, etc.).
-   The app will fetch music recommendations from the backend, specifically tailored to your mood.
-   You'll see a list of songs with their titles and links to the audio files.

### 4\. **AI Writing Therapist**

-   Select your mood (Good, Neutral, or Bad).
-   The app provides a writing prompt based on your current emotional state.
-   For example, if you're feeling sad, the app may ask you to "Write about a challenge you're currently facing."

* * * * *

Core Libraries and Dependencies
-------------------------------

This app uses several powerful libraries to ensure a smooth and feature-rich experience:

-   **Axios**: For making HTTP requests to the backend API.
-   **React Navigation**: For easy and smooth navigation between app screens.
-   **React Native Paper**: A high-quality set of components for a material design UI.
-   **React Native Reanimated**: For smooth animations throughout the app.
-   **React Redux**: For state management, especially useful for handling global app state.
-   **Formik & Yup**: For form handling and validation (e.g., when the user inputs their data).

* * * * *

Important Files
---------------

### 1\. **App.tsx**

-   The main entry point of the app. It sets up the navigation system and handles the routing between screens.

### 2\. **screens/ChatbotScreen.tsx**

-   Contains the chatbot interface where users interact with the AI.

### 3\. **screens/HabitRecommendationScreen.tsx**

-   Collects user data for recommending wellness habits.

### 4\. **screens/MoodMusicScreen.tsx**

-   Allows users to select their mood and receive music recommendations.

### 5\. **screens/AIWritingTherapistScreen.tsx**

-   Provides writing prompts based on the user's mood.

* * * * *

Styling and UI
--------------

We've focused on building a clean and visually appealing user interface with the following libraries:

-   **React Native Paper**: Provides Material Design components.
-   **React Native Linear Gradient**: For adding gradients to the UI elements.
-   **React Native Vector Icons**: For enhancing the UI with scalable vector icons.
-   **React Native Animatable**: Adds smooth animations to UI elements for a more engaging user experience.

* * * * *

Contributions
-------------

We welcome contributions! If you'd like to improve the app, here are some ways you can help:

1.  **Bug Fixes**: If you notice any issues with the app, feel free to submit a pull request with a fix.
2.  **Features**: Add new features such as additional wellness suggestions or integrate other mood-based functionalities.
3.  **Documentation**: Help improve the documentation by suggesting edits or adding new sections.

* * * * *

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

* * * * *

Acknowledgements
----------------

-   **React Native**: For allowing the creation of high-quality mobile apps using JavaScript and React.
-   **Flask (Backend)**: For handling API requests and machine learning model interactions.
-   **Vultr**: For hosting the backend models and APIs.
-   **OpenAI**: For powering the AI chatbot and other AI models.
