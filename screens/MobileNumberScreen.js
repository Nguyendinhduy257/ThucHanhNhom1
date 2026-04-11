import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Độ dài chuẩn của số di động VN sau khi bỏ số 0 ở đầu là 9 số
const MAX_PHONE_LENGTH = 9; 

const getPhoneValidationError = (value) => {
  if (!value) {
    return 'Vui lòng nhập số điện thoại';
  }

  if (value.startsWith('0')) {
    return 'Không nhập số 0 ở đầu theo luật của quốc gia đang được chọn';
  }

  if (value.length !== MAX_PHONE_LENGTH) {
    return 'Số điện thoại phải gồm đúng 9 chữ số sau mã +84';
  }

  // Regex kiểm tra đầu số VN: Bắt đầu bằng 3, 5, 7, 8, 9 và theo sau là 8 chữ số bất kỳ
  if (!/^[35789]\d{8}$/.test(value)) {
    return 'Đầu số di động chưa hợp lệ (Ví dụ hợp lệ: 912345678)';
  }

  return '';
};

const MobileNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm xử lý khi người dùng nhập số điện thoại
  const handlePhoneChange = (text) => {
    // Chỉ cho phép nhập số
    const numericValue = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);

    // Validate real-time: Giới hạn không cho nhập quá 9 số
    if (numericValue.length > MAX_PHONE_LENGTH) {
      setPhoneNumber(numericValue.slice(0, MAX_PHONE_LENGTH));
    }

    // Xóa lỗi ngay lập tức khi người dùng đang nhập lại
    if (errorMsg) {
      setErrorMsg('');
    }
  };

  // Hàm xử lý khi bấm nút Next (Mũi tên xanh)
  const handleNext = () => {
    const validationError = getPhoneValidationError(phoneNumber);
    
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    
    setErrorMsg('');
    // Đã mở khóa dòng điều hướng này:
    navigation.navigate('OTPScreen'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Nút Back */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.title}>Enter your mobile number</Text>

          {/* Label */}
          <Text style={styles.label}>Mobile Number</Text>

          {/* Form nhập liệu */}
          <View style={[styles.inputContainer, errorMsg ? styles.inputError : null]}>
            {/* Ảnh lá cờ */}
            <Image 
              // Đổi tên file cho đúng với ảnh lá cờ Bangladesh trong thư mục assets
              source={require('../assets/FlagBangladesh.png')} 
              style={styles.flagIcon} 
            />
            <Text style={styles.countryCode}>+84</Text>
            
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="number-pad" // Hiển thị bàn phím số
              autoFocus={true}          // Tự động focus khi vào màn hình
              maxLength={10}            // Cho phép nhập dư 1 số để hàm onChangeText xử lý bắt lỗi số 0
            />
          </View>
          
          {/* Hiển thị thông báo lỗi nếu có */}
          {errorMsg !== '' && (
            <Text style={styles.errorText}>{errorMsg}</Text>
          )}

        </View>

        {/* Nút Next (Floating Action Button) */}
        <TouchableOpacity style={styles.fabButton} onPress={handleNext}>
          <Ionicons name="chevron-forward" size={28} color="#FFF" />
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 40,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 17,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  inputError: {
    borderBottomColor: 'red', // Đổi màu viền sang đỏ nếu có lỗi
  },
  flagIcon: {
    width: 30,
    height: 20,
    borderRadius: 3,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    color: '#181725',
    marginRight: 10,
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
    letterSpacing: 1, 
    padding: 15,
    borderRadius: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 8,
  },
  fabButton: {
    position: 'absolute',
    right: 25,
    bottom: 30, 
    width: 60,
    height: 60,
    backgroundColor: '#53B175', 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});

export default MobileNumberScreen;