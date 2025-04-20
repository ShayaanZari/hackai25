import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useTransition } from '@/components/TransitionOverlay';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const router = useRouter();
  const { performTransition, isTransitioning } = useTransition();
  const colorScheme = useColorScheme();
  const imageSource =
    colorScheme === 'dark'
      ? require('@/assets/images/index_dark.png')
      : require('@/assets/images/index_light.png');

  // Function to handle screen tap
  const handleTap = () => {
    if (!isTransitioning) {
      console.log("Tapped");
      router.replace('/ageselect');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <ThemedView style={styles.container}>
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#ded7fa', dark: '#5A56A4' }}
          headerImage={<View />}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Hope Haven</ThemedText>
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Tap to get a fresh start</ThemedText>
          </ThemedView>
        </ParallaxScrollView>

        {/* Image positioned at bottom and behind text */}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Image
          source={imageSource}
          style={styles.footerImage}
          resizeMode="cover"
        />
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
    zIndex: 1,
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300, // adjust based on image size
    zIndex: 0,   // behind text
  },
});