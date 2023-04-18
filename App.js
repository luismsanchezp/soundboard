import { 
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Pressable
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function App() {
  const path = './assets/audio/';
  const animals = [
    {
      id: 1,
      name: 'Dog',
      emoji: '🐶',
      audio: require(path + 'dog.mp3'),
    },
    {
      id: 2,
      name: 'Cat',
      emoji: '🐱',
      audio: require(path + 'cat.mp3'),
    },
    {
      id: 3,
      name: 'Bird',
      emoji: '🐦',
      audio: require(path + 'bird.mp3'),
    },
    {
      id: 4,
      name: 'Fish',
      emoji: '🐟',
      audio: require(path + 'fish.mp3'),
    },
    {
      id: 5,
      name: 'Rabbit',
      emoji: '🐰',
      audio: require(path + 'rabbit.mp3'),
    },
    {
      id: 6,
      name: 'Horse',
      emoji: '🐴',
      audio: require(path + 'horse.mp3'),
    },
    {
      id: 7,
      name: 'Cow',
      emoji: '🐮',
      audio: require(path + 'cow.mp3'),
    },
    {
      id: 8,
      name: 'Pig',
      emoji: '🐷',
      audio: require(path + 'pig.mp3'),
    },
    {
      id: 9,
      name: 'Sheep',
      emoji: '🐑',
      audio: require(path + 'sheep.mp3'),
    },
    {
      id: 10,
      name: 'Goat',
      emoji: '🐐',
      audio: require(path + 'goat.mp3'),
    },
  ];

  const [sound, setSound] = useState();

  async function playSound(animalSound) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(animalSound);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [activeButton, setActiveButton] = useState(null);

  const containerStyle = (buttonId) => {
    const isActive = activeButton === buttonId;
    const baseStyle = styles.emojiCircleContainer;
    const activeStyle = { backgroundColor: 'gray' };
    return isActive ? [baseStyle, activeStyle] : baseStyle;
  };

  const itemStyle = (buttonId) => {
    const isActive = activeButton === buttonId;
    const baseStyle = styles.listItem;
    const activeStyle = { backgroundColor: 'black' };
    return isActive ? [baseStyle, activeStyle] : baseStyle;
  };

  const itemTextStyle = (buttonId) => {
    const isActive = activeButton === buttonId;
    const baseStyle = styles.listItemText;
    const activeStyle = { color: 'white' };
    return isActive ? [baseStyle, activeStyle] : baseStyle;
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable 
        onPress={() => playSound(item.audio)}
        onPressIn={() => setActiveButton(item.id)}
        onPressOut={() => setActiveButton(null)}
      >
        <View style={itemStyle(item.id)}>
          <View style={containerStyle(item.id)}> 
            <Text style={styles.emojiText}>{item.emoji}</Text>
          </View>
          <Text style={itemTextStyle(item.id)}>{item.name}</Text>
        </View>
      </Pressable>
    )
  };

  const renderTitle = () => {
    return <Text style={styles.listHeaderLine}>goofy ahh animals</Text>
  };
  
  const itemSeparator = () => {
    return <View style={styles.separator} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={renderTitle}
        data={animals}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Empty</Text>}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={itemSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  listHeader: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeaderLine: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listItemText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  emojiCircleContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    color: '#fff',
    fontSize: 24,
  },
});
