import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { useGlobal } from '@/context/GlobalContext';

export default function Index() {
  const [input, setInput] = useState('');
  const { situation, setSituation } = useGlobal();

  const router = useRouter();

  const handleSend = () => {
    console.log('User said:', input);
    if (input.trim().length === 0) return;
    setSituation(input);
    setInput(''); // clear box after sending
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