import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from "react-native";
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

type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'aipred'>;

export default function Index() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState('');
  // const [incident, setIncident] = useState("");
  // const [sevScore, setSevScore] = useState("");
  // const [potCrime, setPotCrime] = useState("");

  const [firstPressed, setFirstPressed] = useState(false);

  const navigation = useNavigation<PreferencesScreenNavigationProp>();

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
      const text = JSON.parse(await response.text()).output;
      console.log(`n8n response: ${text}`);
      setData(text);
      setFirstPressed(true);
      // const parsed = JSON.parse(JSON.parse(text).output.replace(/```json|```/g, '').trim());
      // setIncident(parsed.incident_type);
      // setSevScore(parsed.severity_score);
      // setPotCrime(parsed.potential_crime);
    } catch (error) {
      console.error('Error sending to webhook:', error);
    }
  };

  const handleSend = () => {
    console.log('User said:', input);
    if (selectedAge == "Prefer not to say" || selectedRelation == "Prefer not to say" || selectedEmotion == "Prefer not to say"){ console.log("fake send."); return; } // optional: prevent blank sends
    sendToWebhook(input);
    setSubmitted(input);
    setSent(true);
    setInput(''); // clear the box after sending
  };

  const handleSendTwo = () => {
    navigation.navigate('aichat');
  };

  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const isDarkMode = colorScheme === 'dark';

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#5A56A4' : '#EDE8FC',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  };

  const textStyle = {
    color: isDarkMode ? '#EDE8FC' : '#5A56A4',
    fontWeight: '600',
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={stylesScroll.scrollContainer}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Responses</Text>

      <Text>Age selected: {selectedAge}</Text>
      <Text>Relationship selected: {selectedRelation}</Text>
      <Text>Emotion selected: {selectedEmotion}</Text>
      <Text>Situation described: {situation}</Text>

      <View style={{ padding: 20 }}>
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.button}>Generate Recommendations</Text>
      </TouchableOpacity>
      </View>

      <Text>Response: {data}</Text>

      {firstPressed && (
        <View style={{ padding: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleSendTwo}>
          <Text style={styles.button}>Live Agent</Text>
        </TouchableOpacity>
        </View>
      )}
  );
    </View>
    </ScrollView>
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
  button: {
    backgroundColor: '#5A56A4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#EDE8FC',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 32,
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   label: {
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#aaa',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 16,
//     fontStyle: 'italic',
//   },
// });

const stylesScroll = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  innerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  // other styles...
});