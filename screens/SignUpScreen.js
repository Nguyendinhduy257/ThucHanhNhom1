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
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { storeUserToken } from './storageHelper';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // State lưu trữ lỗi
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Biểu thức chính quy kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Trạng thái để hiện dấu tích xanh (khi email đúng định dạng và không bị rỗng)
  const isEmailValid = emailRegex.test(email);

  const handleSignUp = async () => {
    let isValid = true;

    // Reset lỗi mỗi lần bấm nút
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    // 1. Validate Username
    if (!username.trim()) {
      setUsernameError('Vui lòng nhập tên đăng nhập');
      isValid = false;
    }

    // 2. Validate Email
    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else if (!isEmailValid) {
      setEmailError('Email không hợp lệ (ví dụ: abc@gmail.com)');
      isValid = false;
    }

    // 3. Validate Password
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      isValid = false;
    }

    // Nếu tất cả hợp lệ thì cho phép qua
    if (isValid) {
        await storeUserToken("fake-token"); // await cần async ở trên
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }
  };

  // Hàm xử lý gõ phím để tự động xóa dòng lỗi
  const handleUsernameChange = (text) => {
    setUsername(text);
    if (usernameError) setUsernameError('');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F7F4EA', '#EEF8F1', '#FFF0DB']}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.92, y: 1 }}
        style={styles.backgroundGradient}
      />
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/carrotLogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Tiêu đề */}
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>

          {/* Input Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, usernameError ? styles.inputError : null]}
              value={username}
              onChangeText={handleUsernameChange}
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor="#B3B3B3"
            />
            {/* Hiển thị lỗi Username */}
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          </View>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.rowInputContainer, emailError ? styles.inputError : null]}>
              <TextInput
                style={styles.flexInput}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Nhập email của bạn"
                placeholderTextColor="#B3B3B3"
              />
              {/* Hiện dấu tích xanh nếu email đúng định dạng */}
              {isEmailValid && (
                <Ionicons name="checkmark" size={24} color="#53B175" style={styles.iconRight} />
              )}
            </View>
            {/* Hiển thị lỗi Email */}
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Input Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.rowInputContainer, passwordError ? styles.inputError : null]}>
              <TextInput
                style={styles.flexInput}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!isPasswordVisible}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#B3B3B3"
              />
              <TouchableOpacity 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.iconRight}
              >
                <Ionicons 
                  name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                  size={22} 
                  color="#7C7C7C" 
                />
              </TouchableOpacity>
            </View>
            {/* Hiển thị lỗi Password */}
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Điều khoản dịch vụ */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy.</Text>
            </Text>
          </View>

          {/* Nút Sign Up */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Chuyển về màn hình Log In */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginFinal')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E2E2',
    borderRadius: 75,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20, // Giảm từ 30 xuống 20 để vừa vặn hơn khi hiện dòng lỗi
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    color: '#181725',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15,
    paddingTop:15,
    paddingHorizontal: 15,
    borderRadius:20,

  },
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15,
  },
  flexInput: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
    paddingTop:15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderRadius:20,
  },
  iconRight: {
    paddingHorizontal: 5,
  },
  // --- Bổ sung Style cho Validation ---
  inputError: {
    borderBottomColor: '#E74C3C', // Viền chuyển đỏ khi có lỗi
  },
  errorText: {
    color: '#E74C3C', // Chữ lỗi màu đỏ
    fontSize: 14,
    marginTop: 8,
  },
  // ------------------------------------
  termsContainer: {
    marginBottom: 30,
    marginTop: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 22,
  },
  termsLink: {
    color: '#53B175',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#181725',
    fontSize: 14,
    fontWeight: '600',
  },
  loginLink: {
    color: '#53B175',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;