import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabTwoScreen() {
  const backgroundColor = useThemeColor({ light: '#ded7fa', dark: '#5a56a4' }, 'background');
  const cardColor = useThemeColor({ light: '#fff', dark: '#c2a0e8' }, 'background');
  const colorScheme = useColorScheme();
  const imageSource =
    colorScheme === 'dark'
      ? require('@/assets/images/chatbot_dark.png')
      : require('@/assets/images/chatbot_light.png');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      
      <Image
        source={imageSource}
        style={styles.footerImage}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
          {/* Your card content here */}
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '85%',
    width: '85%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 480,
  },
});
