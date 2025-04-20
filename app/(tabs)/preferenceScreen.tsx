import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native'; // Necessary for navigation to work
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp

// Define your stack types
type RootStackParamList = {
  PreferencesScreen: undefined;
  NextScreen: undefined;
};

// Type for the navigation prop of the PreferencesScreen
type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PreferencesScreen'>;

// PreferencesScreen component
const PreferencesScreen = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const navigation = useNavigation<PreferencesScreenNavigationProp>(); // Use the specific navigation prop type

  const allPreferences: string[] = [
    "Under 18",
    "18 - 25",
    "26 - 32",
    "33 - 45",
    "Over 45",
  ];

  const togglePreference = (preference: string) => {
    const isSelected = preferences.includes(preference);
    const updatedPreferences = isSelected
      ? preferences.filter((item) => item !== preference)
      : [...preferences, preference];

    setPreferences(updatedPreferences);
  };

  const handleSubmit = () => {
    navigation.replace('NextScreen'); // Use replace method for navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your age?</Text>

      <View style={styles.cardWrapper}>
        {allPreferences.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => togglePreference(p)}
            style={[{ backgroundColor: preferences.includes(p) ? "#0093ED" : "transparent" }, styles.card]}
          >
            <Text style={[{ color: preferences.includes(p) ? "white" : "#0093ED" }, styles.cardText]}>
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

// NextScreen component
const NextScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>You made it to the next screen, baby 😘</Text>
  </View>
);

// Stack Navigator
const Stack = createNativeStackNavigator();

// Main App component with navigation container
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PreferencesScreen">
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: "#F7FAFD",
  },
  title: {
    color: "#0093ED",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  exit: {
    alignItems: "center",
  },
  exitText: {
    color: "#B497D6",
    textAlign: "center",
    fontStyle: "italic",
  },
  navigationWrapper: {
    marginTop: 20,
  },
});

export default App;
