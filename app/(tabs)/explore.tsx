import { StyleSheet, Image, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function TabTwoScreen() {

  const backgroundColor = useThemeColor({ light: '#fff', dark: '#ded7fa' }, 'background');

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#ded7fa', dark: '#5A56A4' }}
    headerImage={null}
    style={{ flex: 1 }}
    contentContainerStyle={{ flexGrow: 1 }}
    >

      <ThemedView style={[styles.card, { backgroundColor }]} />


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    height: '60%', // Adjust as needed
    width: '80%', // Responsive width
    backgroundColor: 'useThemeColor', // or use `useThemeColor` if themed
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 40, // Adds spacing from the title
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },  
});
