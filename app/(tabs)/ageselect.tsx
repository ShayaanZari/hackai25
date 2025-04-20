import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useGlobal } from '@/context/GlobalContext';

export default function Index() {
  const router = useRouter();

  const AGE_CHOICES = [
    "Prefer not to say",
    "Under 18",
    "18-25",
    "26-32",
    "33-45",
    "Over 45"
  ];

  const { selectedAge, setSelectedAge } = useGlobal();  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 10 }}>Select your age:</Text>
      <Picker
        selectedValue={selectedAge}
        onValueChange={(itemValue, itemIndex) => setSelectedAge(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        {AGE_CHOICES.map((age, index) => (
          <Picker.Item key={index} label={age} value={age} />
        ))}
      </Picker>

      <Text style={{ marginTop: 20 }}>You selected: {selectedAge}</Text>
    </View>
  );
}