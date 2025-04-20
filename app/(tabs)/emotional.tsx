import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

import { useGlobal } from '@/context/GlobalContext';

export default function Index() {
  const router = useRouter();
  
  let EMOTION_CHOICES = [
    "Prefer not to say",
    "Fearful",
    "Hopeless",
    "Anxious",
    "Confused",
    "Numb",
    "Angry",
    "Panicked",
    "Other"
  ];
  const { selectedEmotion, setSelectedEmotion } = useGlobal();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 10 }}>How are you feeling about this?:</Text>
      <Picker
        selectedValue={selectedEmotion}
        onValueChange={(itemValue, itemIndex) => setSelectedEmotion(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        {EMOTION_CHOICES.map((emotion, index) => (
          <Picker.Item key={index} label={emotion} value={emotion} />
        ))}
      </Picker>

      <Text style={{ marginTop: 20 }}>You selected: {selectedEmotion}</Text>
    </View>
  );
}