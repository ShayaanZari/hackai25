import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { useGlobal } from '@/context/GlobalContext';

export default function Index() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [incident, setIncident] = useState("");
  const [sevScore, setSevScore] = useState("");
  const [potCrime, setPotCrime] = useState("");

  const router = useRouter();

  const { selectedAge, selectedRelation, selectedEmotion, situation } = useGlobal();

  const sendToWebhook = async (message: string) => {
    try {
      const response = await fetch('http://0.0.0.0:5678/webhook/classify-incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          situation: situation,
          age: selectedAge,
          relation: selectedRelation,
          emotion: selectedEmotion
        })
      });
      const text = await response.text();
      console.log(`n8n response: ${text}`);

      const parsed = JSON.parse(JSON.parse(text).output.replace(/```json|```/g, '').trim());
      setIncident(parsed.incident_type);
      setSevScore(parsed.severity_score);
      setPotCrime(parsed.potential_crime);

      console.log(potCrime);
    } catch (error) {
      console.error('Error sending to webhook:', error);
    }
  };

  const handleSend = () => {
    console.log('User said:', input);
    if (selectedAge == "Prefer not to say" || selectedRelation == "Prefer not to say" || selectedEmotion == "Prefer not to say"){ console.log("fake send."); return; } // optional: prevent blank sends
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
      <Text style={styles.label}>Responses</Text>

      <Text>Age selected: {selectedAge}</Text>
      <Text>Relationship selected: {selectedRelation}</Text>
      <Text>Emotion selected: {selectedEmotion}</Text>
      <Text>Situation described: {situation}</Text>

      <Button title="Send Data" onPress={handleSend} />

      <Text style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>{incident}{"\n"}{sevScore}{"\n"}{potCrime.toString().toUpperCase()}{"\n"}</Text>
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