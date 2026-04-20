// utils/storageHelper.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_KEY = 'user_token'; // Key để lưu trữ

// 1. Lưu thông tin đăng nhập (Token hoặc User Info)
export const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_KEY, token);
    console.log('Đã lưu token thành công!');
  } catch (e) {
    console.error('Lỗi khi lưu token:', e);
  }
};

// 2. Lấy thông tin đăng nhập (Dùng cho Auto Login)
export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
    return token;
  } catch (e) {
    console.error('Lỗi khi lấy token:', e);
    return null;
  }
};

// 3. Xóa thông tin đăng nhập (Dùng cho Logout)
export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    console.log('Đã xóa token (Đăng xuất)!');
  } catch (e) {
    console.error('Lỗi khi xóa token:', e);
  }
};