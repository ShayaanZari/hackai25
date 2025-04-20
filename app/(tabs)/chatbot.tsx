import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabTwoScreen() {
  const backgroundColor = useThemeColor({ light: '#ded7fa', dark: '#5a56a4' }, 'background');
  const cardColor = useThemeColor({ light: '#fff', dark: '#c2a0e8' }, 'background');

  return (
    <ScrollView
        
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={styles.scrollContainer}
    >
      <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '80%',
    width: '80%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

