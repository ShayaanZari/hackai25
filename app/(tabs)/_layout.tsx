import { Tabs, useRouter, Slot } from 'expo-router';
import React from 'react';
import { View, Button, Platform, Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GlobalProvider } from '@/context/GlobalContext';

export default function TabLayout() {
  const router = useRouter();
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      console.warn('User tried going back to nonexistent screen.');
      // or: router.replace('/some-safe-route');
    }
  };

  return (
    <GlobalProvider>
      {/* Whole screen layout wrapper */}
      <View style={{ flex: 1 }}>
        {/* This renders the actual page content under this layout */}
        <Slot />

        {/* Floating back button over all pages */}
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={28} color="#2e2d2d" />
        </Pressable>
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // spacing from top
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50, // adjust for status bar height
    left: 16,
    zIndex: 10,
  },
});