import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp

// Define your stack types
type RootStackParamList = {
  InteractHaven: undefined;
  PreferencesScreen: undefined;
};

type InteractHavenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InteractHaven'>;

const InteractHaven = () => {
  const navigation = useNavigation<InteractHavenNavigationProp>(); // Use the specific navigation prop type

  // Handle press event for the image
  const handleImagePress = () => {
    navigation.replace('PreferencesScreen'); // Navigate to PreferencesScreen using replace
  };

  return (
    <View style={styles.container}>
      {/* Background Layers */}
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      {/* Title */}
      <Text style={styles.title}>
        Interact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Haven
      </Text>

      {/* Image Touchable to Trigger Navigation */}
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={require('../../assets/images/haven.png')} // Path to your image
          style={styles.image}
          resizeMode="cover" // Ensure the image covers the space
        />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    width: 393,
    height: 852,
    backgroundColor: 'rgba(220,212,255,0.42)', // Background color with opacity
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative', // To position layers absolutely
  },
  bgLayer1: {
    width: 465,
    height: 890,
    backgroundColor: 'rgba(222,215,250,0.47)', // Light background layer
    borderRadius: 71,
    position: 'absolute',
    top: 819,
    left: 768,
  },
  bgLayer2: {
    width: 346,
    height: 244,
    backgroundColor: 'rgba(194,160,232,1)', // Accent color layer
    borderRadius: 45,
    position: 'absolute',
    top: 22,
    left: 24,
  },
  title: {
    color: 'rgba(236,232,252,1)', // Light color for title
    position: 'absolute',
    top: 113,
    left: 47,
    fontFamily: 'PlayfairDisplay-Regular', // Elegant font
    fontSize: 30,
    textAlign: 'left',
  },
  image: {
    width: 186,
    height: 163,
    position: 'absolute',
    top: 62,
    left: 100, // Adjust position of the image
  },
});

export default InteractHaven;
