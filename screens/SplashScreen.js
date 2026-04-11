import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  
  // Tự động chuyển sang màn hình thứ 2 (Onboarding) sau 5 giây mà không cần người dùng phải làm gì
  useEffect(() => {
    const timer = setTimeout(() => {
      // Dùng 'replace' thay vì 'navigate' để người dùng không bấm nút Back quay lại màn hình chờ này được
      navigation.replace('Onboarding'); 
    }, 5000);

    return () => clearTimeout(timer); // Dọn dẹp bộ đếm giờ
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#53B175" barStyle="light-content" />
      <Image
        source={require('../assets/LandingPage.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175', // Màu xanh chủ đạo của thương hiệu
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',     // Căn giữa theo chiều ngang
  },
  logo: {
    width: 250, // có thể tăng giảm số này để logo to/nhỏ theo ý muốn
    height: 100,
  },
});

export default SplashScreen;