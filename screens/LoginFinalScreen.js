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

const LoginFinalScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // State lưu trữ lỗi
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
        let isValid = true;

        // Reset lỗi mỗi lần bấm nút
        setEmailError('');
        setPasswordError('');

        // 1. Validate Email
        if (!email.trim()) {
            setEmailError('Vui lòng nhập email');
            isValid = false;
        } else {
            // Biểu thức chính quy (Regex) kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Email không hợp lệ (ví dụ: abc@gmail.com)');
                isValid = false;
            }
        }

        // 2. Validate Password
        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        }

        // Nếu tất cả đều hợp lệ thì mới cho qua
        if (isValid) {
            console.log('Đăng nhập thành công với:', email, password);
            // TODO: Thêm logic gọi API đăng nhập ở đây

            // Sau khi đăng nhập thành công thì chuyển sang Home:
            // navigation.navigate('Home');
        }
    };

    // Xử lý khi người dùng gõ phím để xóa lỗi ngay lập tức
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
                    <Text style={styles.title}>Loging</Text>
                    <Text style={styles.subtitle}>Enter your emails and password</Text>

                    {/* Input Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, emailError ? styles.inputError : null]}
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Nhập email của bạn"
                            placeholderTextColor="#B3B3B3"
                        />
                        {/* Hiển thị lỗi Email */}
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>

                    {/* Input Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
                            <TextInput
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={!isPasswordVisible}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#B3B3B3"
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                style={styles.eyeIcon}
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

                    {/* Quên mật khẩu */}
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Nút Log In */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    {/* Chuyển sang màn hình Đăng ký */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupLink}>Signup</Text>
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
        width: 100,
        height: 100,
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
        marginBottom: 20, // Giảm margin một chút để chứa dòng chữ lỗi
    },
    label: {
        fontSize: 16,
        color: '#7C7C7C',
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        fontSize: 15,
        color: '#181725',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 20,
        // Thêm padding để tăng diện tích chạm và tạo cảm giác thoải mái hơn khi nhập
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        paddingBottom: 10,

    },
    passwordInput: {
        flex: 1,
        fontSize: 18,
        color: '#181725',
        paddingBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        // Thêm padding để tăng diện tích chạm và tạo cảm giác thoải mái hơn khi nhập
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 5,
    },
    // --- Style bổ sung cho Validation ---
    inputError: {
        borderBottomColor: '#E74C3C', // Viền đỏ khi có lỗi
    },
    errorText: {
        color: '#E74C3C',
        fontSize: 14,
        marginTop: 8,
    },
    // -----------------------------------
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 30,
        marginTop: 10,
    },
    forgotPasswordText: {
        color: '#181725',
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#53B175',
        borderRadius: 19,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    signupText: {
        color: '#181725',
        fontSize: 14,
        fontWeight: '600',
    },
    signupLink: {
        color: '#53B175',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default LoginFinalScreen;