import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

import { useGlobal } from '@/context/GlobalContext';

export default function Index() {
  const router = useRouter();
  
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 10 }}>Select the relation to your coworker:</Text>
      <Picker
        selectedValue={selectedRelation}
        onValueChange={(itemValue, itemIndex) => setSelectedRelation(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        {RELATIONSHIP_CHOICES.map((relation, index) => (
          <Picker.Item key={index} label={relation} value={relation} />
        ))}
      </Picker>

      <Text style={{ marginTop: 20 }}>You selected: {selectedRelation}</Text>
    </View>
  );
}