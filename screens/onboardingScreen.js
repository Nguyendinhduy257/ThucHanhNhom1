import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/FarmerPicture.png')} 
      style={styles.bg}
      resizeMode="stretch" // Giải quyết vấn đề responsive lấp đầy màn hình
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/IconStartScreen.png')} style={styles.icon} />
        <Text style={styles.title}>Welcome{"\n"}to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SignIn')} // Chuyển sang màn hình SignIn
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    width: '100%', 
    
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', // Tăng độ mờ nền lên một chút để chữ dễ đọc hơn
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingBottom: 60, 
    paddingHorizontal: 30 
  },
  icon: { 
    width: 50, 
    height: 50, 
    marginBottom: 15,
    resizeMode: 'contain' // Giữ cho icon logo không bị méo
  },
  title: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#FFF', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#EEE', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  button: { 
    backgroundColor: '#53B175', 
    width: '100%', 
    paddingVertical: 18, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  btnText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: '600' 
  }
});

export default OnboardingScreen;