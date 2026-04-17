import React from 'react';
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
        
        {/* Màn hình 3: Login */}
        <Stack.Screen name="SignIn" component={LoginScreen} />
        
        {/* Màn hình 4: Nhập số điện thoại */}
        <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />

        {/* Màn hình 5: Nhập mã OTP */}
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        {/** Màn hình 6: Chọn vị trí */}
        <Stack.Screen name="LocationScreen" component={LocationScreen} />

        {/* Màn hình 7: Đăng nhập final */}
        <Stack.Screen name="LoginFinal" component={LoginFinalScreen} />

        {/* Màn hình 8: Đăng ký */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Màn hình 9: Trang chủ */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {/* Màn hình 10: Chi tiết sản phẩm */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        {/* Màn hình 11: Khám phá */}
        <Stack.Screen name="Explore" component={ExploreScreen} />
        {/* Màn hình 12: Beverages */}
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
        {/* Màn hình 13: Dairy & Eggs */}
        <Stack.Screen name="DairyEggs" component={DairyEggsScreen} />
        {/* Màn hình 14: Giỏ hàng */}
        <Stack.Screen name="Cart" component={CartScreen} />
        {/* Màn hình 15: Yêu thích */}
        <Stack.Screen name="Favourite" component={FavouriteScreen} />
      </Stack.Navigator>
      {/* */}
      
    </NavigationContainer>
  );
}
