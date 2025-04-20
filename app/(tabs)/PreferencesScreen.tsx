import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Update RootStackParamList to match across files
type RootStackParamList = {
  InteractHaven: undefined;
  PreferencesScreen: undefined;
  NextScreen: undefined;
};

type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PreferencesScreen'>;

const PreferencesScreen = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const navigation = useNavigation<PreferencesScreenNavigationProp>();

  const allPreferences = [
    "Under 18",
    "18 - 25",
    "26 - 32",
    "33 - 45",
    "Over 45",
  ];

  const togglePreference = (preference: string) => {
    const isSelected = preferences.includes(preference);
    const updated = isSelected
      ? preferences.filter((item) => item !== preference)
      : [...preferences, preference];

    setPreferences(updated);
  };

  const handleSubmit = () => {
    // Navigate to NextScreen when submitted
    navigation.navigate('NextScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your age?</Text>

      <View style={styles.cardWrapper}>
        {allPreferences.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => togglePreference(p)}
            style={[
              styles.card,
              { backgroundColor: preferences.includes(p) ? '#0093ED' : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.cardText,
                { color: preferences.includes(p) ? 'white' : '#0093ED' },
              ]}
            >
              {p}
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
    backgroundColor: '#F7FAFD',
  },
  title: {
    color: '#0093ED',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: '#0093ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
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
    borderColor: '#0093ED',
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
    color: '#B497D6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationWrapper: {
    marginTop: 20,
  },
});

export default PreferencesScreen;
