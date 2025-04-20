import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Update RootStackParamList to include all your screens
type RootStackParamList = {
  InteractHaven: undefined;
  PreferencesScreen: undefined;
  NextScreen: undefined;
};

type InteractHavenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InteractHaven'>;

const InteractHaven = () => {
  const navigation = useNavigation<InteractHavenNavigationProp>();

  // Handle press event for the image
  const handleImagePress = () => {
    // Use navigate instead of replace for better navigation flow
    navigation.navigate('PreferencesScreen');
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
          source={require('../../assets/images/haven.png')}
          style={styles.image}
          resizeMode="cover"
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
    backgroundColor: 'rgba(220,212,255,0.42)',
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  bgLayer1: {
    width: 465,
    height: 890,
    backgroundColor: 'rgba(222,215,250,0.47)',
    borderRadius: 71,
    position: 'absolute',
    top: 819,
    left: 768,
  },
  bgLayer2: {
    width: 346,
    height: 244,
    backgroundColor: 'rgba(194,160,232,1)',
    borderRadius: 45,
    position: 'absolute',
    top: 22,
    left: 24,
  },
  title: {
    color: 'rgba(236,232,252,1)',
    position: 'absolute',
    top: 113,
    left: 47,
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 30,
    textAlign: 'left',
  },
  image: {
    width: 186,
    height: 163,
    position: 'absolute',
    top: 62,
    left: 100,
  },
});

export default InteractHaven;
