import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Image, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useGlobal } from '@/context/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';

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
    navigation.navigate('aipred');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Describe your situation:</Text>

    <TextInput
    style={styles.input}
    value={input}
    onChangeText={setInput}
    placeholder="Type your message..."
    />

    <View style={{ flex: 1 }} />

    <View style={styles.navigationWrapper}>
      <Pressable onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  </View>
  );
}

{/* <View
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
</View> */}

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
  title: {
    color: '#EDE8FC',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: '#EDE8FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#C2A0E8',
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
    borderColor: '#EDE8FC',
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
    color: '#EDE8FC',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationWrapper: {
    marginTop: 20,
  },
});