import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Updated RootStackParamList to include Feelings
type RootStackParamList = {
  InteractHaven: undefined;
  PreferencesScreen: undefined;
  Relationship: undefined;
  Feelings: undefined;
};

type RelationshipNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Relationship'>;

const Relationship = () => {
  const [selectedRelationships, setSelectedRelationships] = useState<string[]>([]);
  const navigation = useNavigation<RelationshipNavigationProp>();

  const relationshipTypes = [
    "spouse",
    "ex",
    "family member ",
    "friend",
    "roommate",
    "co worker",
    "online acquaintance",
    "stranger",
  ];

  const toggleRelationship = (relationship: string) => {
    const isSelected = selectedRelationships.includes(relationship);
    const updated = isSelected
      ? selectedRelationships.filter((item) => item !== relationship)
      : [...selectedRelationships, relationship];

    setSelectedRelationships(updated);
  };

  const handleSubmit = () => {
    // Updated to navigate to Feelings screen
    navigation.navigate('Feelings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your relationship status?</Text>

      <View style={styles.cardWrapper}>
        {relationshipTypes.map((relationship) => (
          <TouchableOpacity
            key={relationship}
            onPress={() => toggleRelationship(relationship)}
            style={[
              styles.card,
              { backgroundColor: selectedRelationships.includes(relationship) ? '#D7F5D1' : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.cardText,
                { color: selectedRelationships.includes(relationship) ? 'white' : '#EDE8FC' },
              ]}
            >
              {relationship}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.navigationWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>

        <Pressable onPress={handleSubmit} style={styles.exit}>
          <Text style={styles.exitText}>I prefer not to say</Text>
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

export default Relationship;
