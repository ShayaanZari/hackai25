import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

// Define the types for our context
type TransitionContextType = {
  performTransition: (navigateFunction: () => void) => void;
  isTransitioning: boolean;
};

// Create context with default values
const TransitionContext = createContext<TransitionContextType>({
  performTransition: () => {},
  isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

type TransitionProviderProps = {
  children: ReactNode;
};

export function TransitionProvider({ children }: TransitionProviderProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const colorScheme = useColorScheme();
  
  // Using the purple overlay colors for light and dark mode
  const backgroundColorLight = useThemeColor({ light: '#ded7fa' }, 'background');
  const backgroundColorDark = useThemeColor({ dark: '#5A56A4' }, 'background');
  
  // Get the right background color based on color scheme
  const backgroundColor = colorScheme === 'dark' ? backgroundColorDark : backgroundColorLight;

  const performTransition = (navigateFunction: () => void) => {
    setIsTransitioning(true);
    
    // Step 1: Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Navigate when fully faded in
      navigateFunction();
      
      // Step 3: Fade out after navigation
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          setIsTransitioning(false);
        });
      }, 0);
    });
  };
  
  return (
    <TransitionContext.Provider value={{ performTransition, isTransitioning }}>
      {children}
      <Animated.View 
        style={[
          styles.overlay,
          { 
            opacity: fadeAnim,
            backgroundColor,
            // Only capture touches when transitioning
            pointerEvents: isTransitioning ? 'auto' : 'none'
          }
        ]}
      />
    </TransitionContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999, // Ensure it's above everything
  },
});