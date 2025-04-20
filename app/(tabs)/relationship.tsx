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

type PreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'relationship'>;

export default function Relationship() {
  const router = useRouter();
  
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  
  const RELATIONSHIP_CHOICES = [
    "Prefer not to say",
    "Spouse",
    "Ex",
    "Family Member",
    "Friend",
    "Roommate",
    "Coworker",
    "Online Acquaintance",
    "Stranger",
    "Other"
  ];
  const { selectedRelation, setSelectedRelation } = useGlobal();

  const handleSubmit = () => {
      // Navigate to NextScreen when submitted
      navigation.navigate('emotional');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is your relation to the perpetrator?</Text>
  
        <View style={styles.cardWrapper}>
          {RELATIONSHIP_CHOICES.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setSelectedRelation(p)}
              style={[
                styles.card,
                { backgroundColor: selectedRelation.includes(p) ? '#D7F5D1' : 'transparent' },
              ]}
            >
              <Text
                style={[
                  styles.cardText,
                  { color: selectedRelation.includes(p) ? 'white' : '#EDE8FC' },
                ]}
              >
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
        </View>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: '#C2A0E8',
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