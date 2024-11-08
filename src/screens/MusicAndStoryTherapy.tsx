import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';

interface Song {
  title: string;
  file_path: string;
}

const MusicTherapyScreen: React.FC = () => {
  const [mood, setMood] = useState('');
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const getRecommendations = async () => {
    try {
      const response = await axios.post('http://139.84.154.10:5000/music_recommendation', { mood });
      setRecommendations(response.data);
      
      if (response.data.length > 0) {
        playSong(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:');
    }
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Therapy</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mood (fun/relaxation/motivation)"
        value={mood}
        onChangeText={setMood}
      />
      <Button title="Get Recommendations" onPress={getRecommendations} />
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.file_path}
        renderItem={({ item }) => (
          <View style={styles.songContainer}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Button title="Play" onPress={() => playSong(item)} />
          </View>
        )}
      />
      {currentSong && (
        <Video
          source={{ uri: `http://139.84.154.10:5000/music/${currentSong.file_path}` }}
          style={styles.video}
          controls={true}
          paused={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  songContainer: {
    marginBottom: 15,
  },
  songTitle: {
    fontSize: 18,
  },
  video: {
    height: 300,
    width: '100%',
  },
});  

export default MusicTherapyScreen;
