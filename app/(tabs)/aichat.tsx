import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, ScrollView } from "react-native";
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

type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'aichat'>;

export default function Index() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');

  const router = useRouter();
  const navigation = useNavigation<PreferencesScreenNavigationProp>();

  const sendToWebhook = async (message: string) => {
    try {
      const response = await fetch('http://0.0.0.0:5678/webhook/9200055a-d1cb-4f47-8d95-6ff0b28f0014', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: message,
        })
      });
  
      let temp = await response.text();
      if(!temp.startsWith('{')){
        const data = temp;
        console.log(`n8n response: ${data}`);
        setData(data);
      } else {
        console.log(`error: ${temp}`);
      }
    } catch (error) {
      console.error('Error sending to webhook:', error);
    }
  };

  const handleSend = () => {
    console.log('User said:', input);
    if (input.trim().length === 0) return; // optional: prevent blank sends
    sendToWebhook(input);
    setSubmitted(input);
    setInput(''); // clear the box after sending
  };

  return (
    <View
      style={ styles.container }
    >
      <Text style={styles.label}>Say something:</Text>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />

      <Button title="Send" onPress={handleSend} />

      <Text style={styles.result}>Last message: {submitted}</Text>

      <Text style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: '#C2A0E8',
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