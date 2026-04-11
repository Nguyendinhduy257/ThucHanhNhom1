import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình từ thư mục screens
import SplashScreen from './screens/SplashScreen';
import onboardingScreen from './screens/onboardingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }} // Ẩn thanh header mặc định của hệ thống
      >
        {/* Màn hình 1: Splash xanh lá */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* Màn hình 2: Welcome (Anh nông dân) */}
        <Stack.Screen name="Onboarding" component={onboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}