import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Update RootStackParamList to include Feelings
type RootStackParamList = {
  InteractHaven: undefined;
  PreferencesScreen: undefined;
  Relationship: undefined;
  Feelings: undefined;
};

type FeelingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feelings'>;

const Feelings = () => {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const navigation = useNavigation<FeelingsNavigationProp>();

  const feelingsOptions = [
    "on edge",
    "hopeless",
    "fearful",
    "powerless",
    "confused",
    "anxious",
    "scared",
    "frozen",
    "numb",
    "angry",
    "panicked",
  ];

  const toggleFeeling = (feeling: string) => {
    const isSelected = selectedFeelings.includes(feeling);
    const updated = isSelected
      ? selectedFeelings.filter((item) => item !== feeling)
      : [...selectedFeelings, feeling];

    setSelectedFeelings(updated);
  };

  const handleSubmit = () => {
    // Navigate to next screen when submitted
    navigation.navigate('InteractHaven');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.cardWrapper}>
        {feelingsOptions.map((feeling) => (
          <TouchableOpacity
            key={feeling}
            onPress={() => toggleFeeling(feeling)}
            style={[
              styles.card,
              { backgroundColor: selectedFeelings.includes(feeling) ? '#D7F5D1' : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.cardText,
                { color: selectedFeelings.includes(feeling) ? 'white' : '#EDE8FC' },
              ]}
            >
              {feeling}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.navigationWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>

        <Pressable onPress={handleSubmit} style={styles.exit}>
          <Text style={styles.exitText}>I prefer not to say</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: '#C2A0E8',
  },
  title: {
    color: '#EDE8FC',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: '#EDE8FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#C2A0E8',
    fontWeight: '500',
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#EDE8FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exit: {
    alignItems: 'center',
  },
  exitText: {
    color: '#EDE8FC',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationWrapper: {
    marginTop: 20,
  },
});

export default Feelings;
