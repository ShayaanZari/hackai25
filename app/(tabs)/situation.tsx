import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useGlobal } from '@/context/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Update RootStackParamList to match across files
type RootStackParamList = {
  ageselect: undefined;
  relationship: undefined;
  emotional: undefined;
  situation: undefined;
  aipred: undefined;
  aichat: undefined;
};

type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'situation'>;

export default function Index() {
  const [input, setInput] = useState('');
  const { situation, setSituation } = useGlobal();

  const router = useRouter();
  const navigation = useNavigation<PreferencesScreenNavigationProp>();

  const handleSend = () => {
    console.log('User said:', input);
    if (input.trim().length === 0) return;
    setSituation(input);
    setInput(''); // clear box after sending
    navigation.navigate('aipred');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.label}>Describe your situation:</Text>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />

      <Button title="Send" onPress={handleSend} />

      <Text style={styles.result}>Input: {situation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});