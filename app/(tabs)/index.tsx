import { useEffect, useRef } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useTransition } from '@/components/TransitionOverlay';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
      performTransition(() => router.replace('/chatbot'));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <ThemedView style={styles.container}>
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

        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.footerImage}
            resizeMode="contain"
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
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 30,
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    //height: 200,
  },
});