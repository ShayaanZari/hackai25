import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Button title="Go to Age screen" onPress={() => router.push('/ageselect')} />
      <Button title="Go to Relationship screen" onPress={() => router.push('/relationship')} />
      <Button title="Go to Emotion screen" onPress={() => router.push('/emotional')} />
      <Button title="Go to AIPred screen" onPress={() => router.push('/aipred')} />
      <Button title="Go to AI screen" onPress={() => router.push('/aichat')} />
    </View>
  );
}