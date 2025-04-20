import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTransition } from '@/components/TransitionOverlay';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  const { performTransition, isTransitioning } = useTransition();
  const hasTransitioned = useRef(false);

  useEffect(() => {
    // Only perform the transition once
    if (!hasTransitioned.current && !isTransitioning) {
      hasTransitioned.current = true;
      
      // Use a short delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        performTransition(() => router.replace('/explore'));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [router, performTransition, isTransitioning]);

  return (
    <ThemedView style={styles.container}>
      {/* Parallax Scroll View for your content */}
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#ded7fa', dark: '#5A56A4' }}
        headerImage={null}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Unshackle</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Get a fresh start</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
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
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
});