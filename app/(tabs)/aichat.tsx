import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');

  const router = useRouter();

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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
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