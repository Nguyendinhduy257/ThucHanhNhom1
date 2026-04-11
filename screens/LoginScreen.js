import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Dùng icon cho Google và Facebook

const LoginScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      
      {/* 1. Phần ảnh hoa quả phía trên */}
      <Image
        source={require('../assets/Mask Group.png')} 
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* 2. Phần nội dung phía dưới */}
      <View style={styles.contentContainer}>
        
        <Text style={styles.title}>
          Get your groceries{'\n'}with nectar
        </Text>

        {/* Form nhập số điện thoại */}
        <View style={styles.phoneInputContainer}>
          {/* Ảnh lá cờ (có thể thay bằng icon cờ Việt Nam/Bangladesh có trong assets) */}
          <Image 
            source={require('../assets/FlagBangladesh.png')} 
            style={styles.flagIcon} 
          />
          <Text style={styles.countryCode}>+880</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter phone number"
            keyboardType="phone-pad" // Mở bàn phím số
          />
        </View>

        <Text style={styles.dividerText}>Or connect with social media</Text>

        {/* Nút Continue with Google */}
        <TouchableOpacity 
          style={[styles.socialBtn, { backgroundColor: '#5383EC' }]}
          activeOpacity={0.8}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="logo-google" size={24} color="#FFF" />
          </View>
          <Text style={styles.socialBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Nút Continue with Facebook */}
        <TouchableOpacity 
          style={[styles.socialBtn, { backgroundColor: '#4A66AC' }]}
          activeOpacity={0.8}
          // Chuyển tạm sang màn hình Home sau khi bấm
          onPress={() => navigation.navigate('Home')} 
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="logo-facebook" size={24} color="#FFF" />
          </View>
          <Text style={styles.socialBtnText}>Continue with Facebook</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  headerImage: {
    width: '100%',
    height: 350, // Kích thước xấp xỉ nửa màn hình, có thể tinh chỉnh lại
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 35,
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2', // Đường viền mờ phía dưới
    paddingBottom: 10,
    marginBottom: 30,
  },
  flagIcon: {
    width: 35,
    height: 25,
    borderRadius: 4,
    marginRight: 15,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginRight: 20,
    width: 60, // Đặt width cố định cho phần mã quốc gia để căn chỉnh đẹp hơn
    borderRightWidth:3,
    borderRightColor: '#E2E2E2',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    paddingLeft: 16,
    paddingTop:20,
    paddingBottom: 20,
    borderRadius:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  dividerText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 14,
    marginBottom: 20,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  iconWrapper: {
    position: 'absolute', // Cố định icon ở bên trái
    left: 30,
  },
  socialBtnText: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
