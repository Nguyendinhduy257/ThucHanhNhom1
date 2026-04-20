
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình từ thư mục screens
import SplashScreen from './screens/SplashScreen';
import onboardingScreen from './screens/onboardingScreen';
import LoginScreen from './screens/LoginScreen';
import MobileNumberScreen from './screens/MobileNumberScreen';
import OTPScreen from './screens/OTPScreen';
import LocationScreen from './screens/LocationScreen';
import LoginFinalScreen from './screens/LoginFinalScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ExploreScreen from './screens/ExploreScreen';
import BeveragesScreen from './screens/BeveragesScreen';
import DairyEggsScreen from './screens/DairyEggsScreen';
import CartScreen from './screens/CartScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import { FavouriteProvider } from './screens/FavouriteContext';
import CheckoutModal from './screens/CheckoutModal';
import SuccessScreen from './screens/SuccessScreen';
import ErrorModal from './screens/ErrorModal';
import ProfileScreen from './screens/ProfileScreen';
import { getUserToken } from './screens/storageHelper'; // Hàm lấy token từ storage

import React, { useState, useEffect } from 'react'; // Thêm useEffect, useState
import { View, ActivityIndicator } from 'react-native';
import OrderScreen from './screens/OrderScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getUserToken();
      setUserToken(token);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  return (
    <FavouriteProvider>
      <NavigationContainer>
        {/* Chỉ giữ lại 1 Navigator duy nhất */}
        <Stack.Navigator
          // Dùng logic điều hướng ở đây
          initialRouteName={userToken ? "Home" : "Splash"}
          screenOptions={{ headerShown: false }}
        >
          {/* Màn hình Splash */}
          <Stack.Screen name="Splash" component={SplashScreen} />

          {/* Các màn hình khác */}
          <Stack.Screen name="Onboarding" component={onboardingScreen} />
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="LoginFinal" component={LoginFinalScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen name="Beverages" component={BeveragesScreen} />
          <Stack.Screen name="DairyEggs" component={DairyEggsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="Checkout" component={CheckoutModal} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="Error" component={ErrorModal} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavouriteProvider>
  );
}