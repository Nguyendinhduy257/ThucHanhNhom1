import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OTPScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm xử lý khi gõ phím
  const handleCodeChange = (text) => {
    // Chỉ lấy số
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Giới hạn 4 số
    if (numericValue.length <= 4) {
      setCode(numericValue);
    }

    // Xóa lỗi nếu đang nhập lại
    if (errorMsg) {
      setErrorMsg('');
    }

  };

  // Hàm xử lý khi bấm Next
  const handleNext = () => {
    // Validation: Phải nhập đủ 4 số
    if (code.length < 4) {
      setErrorMsg('Vui lòng nhập đủ 4 chữ số mã OTP');
      return;
    }

    setErrorMsg('');
    console.log('Mã OTP hợp lệ:', code);
        // Điều hướng sang màn hình chọn vị trí
    navigation.navigate('LocationScreen');
    // TODO: Chuyển sang màn hình Home
    // navigation.navigate('Home');
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

          <Text style={styles.title}>Enter your 4-digit code</Text>
          <Text style={styles.label}>Code</Text>

          {/* KHU VỰC HIỂN THỊ MÃ OTP MỚI */}
          <View style={styles.otpWrapper}>
            
            {/* Giao diện 4 ô chứa số dàn đều màn hình */}
            <View style={styles.otpDisplayContainer}>
              {[0, 1, 2, 3].map((index) => (
                <View 
                  key={index} 
                  style={[
                    styles.otpBox, 
                    errorMsg ? styles.otpBoxError : null, // Hiện viền đỏ nếu có lỗi
                    code.length === index ? styles.otpBoxActive : null // Hiện viền xanh cho ô đang được focus
                  ]}
                >
                  <Text style={styles.otpText}>
                    {/* Hiển thị số tại vị trí index, nếu chưa nhập thì hiện dấu '-' */}
                    {code[index] || '-'}
                  </Text>
                </View>
              ))}
            </View>

            {/* Input ẩn đè lên trên để hứng sự kiện bàn phím */}
            <TextInput
              style={styles.hiddenInput}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus={true}
            />
          </View>

          {/* Báo lỗi nếu nhập thiếu */}
          {errorMsg !== '' && (
            <Text style={styles.errorText}>{errorMsg}</Text>
          )}

        </View>

        {/* Nút Resend và Next ở dưới cùng */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => console.log('Resend OTP clicked')}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fabButton} onPress={handleNext}>
            <Ionicons name="chevron-forward" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
        
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
    marginBottom: 40,
    marginTop: 20,
    marginLeft: -5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 20, // Tăng khoảng cách với ô nhập
  },
  
  // --- Style cho cụm OTP mới ---
  otpWrapper: {
    position: 'relative',
    height: 60, // Chiều cao của khu vực nhập
    justifyContent: 'center',
  },
  otpDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Dàn đều 4 số ra hai bên
    width: '100%',
  },
  otpBox: {
    width: '20%', // Chiếm 20% chiều ngang màn hình cho mỗi ô
    borderBottomWidth: 2,
    borderBottomColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  otpBoxActive: {
    borderBottomColor: '#53B175', // Đổi màu xanh cho ô chuẩn bị nhập
  },
  otpBoxError: {
    borderBottomColor: 'red', // Đổi màu đỏ khi có lỗi
  },
  otpText: {
    fontSize: 14, // CHỮ TO HƠN
    fontWeight: 'bold',
    color: '#181725',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0, // Làm tàng hình Input
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 15,
  },
  // -----------------------------

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  resendText: {
    color: '#53B175',
    fontSize: 16,
    fontWeight: '500',
  },
  fabButton: {
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

export default OTPScreen;