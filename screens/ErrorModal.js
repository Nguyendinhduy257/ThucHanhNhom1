import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native'; // Thêm Image vào đây
import { Ionicons } from '@expo/vector-icons';

const ErrorModal = ({ visible, onClose, onTryAgain, onBackHome }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#181725" />
          </TouchableOpacity>

          {/* Thay thế Icon bằng Image từ thư mục assets */}
          <Image 
            source={require('../assets/error.png')} 
            style={styles.errorImage} 
            resizeMode="contain" 
          />
          
          <Text style={styles.title}>Oops! Order Failed</Text>
          <Text style={styles.subtitle}>Something went terribly wrong.</Text>

          <TouchableOpacity style={styles.tryAgainBtn} onPress={onTryAgain}>
            <Text style={styles.tryAgainText}>Please Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backHomeBtn} onPress={onBackHome}>
            <Text style={styles.backHomeText}>Back to home</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    width: '85%', 
    backgroundColor: 'white', 
    borderRadius: 18, 
    padding: 25, 
    alignItems: 'center', 
    position: 'relative' 
  },
  closeButton: { 
    position: 'absolute', 
    top: 15, 
    left: 15, 
    padding: 5 
  },
  // Style mới cho hình ảnh lỗi
  errorImage: {
    width: 200,   // Điều chỉnh kích thước cho phù hợp với thiết kế
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#181725', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#7C7C7C', 
    marginBottom: 30, 
    textAlign: 'center', 
    paddingHorizontal: 10 
  },
  tryAgainBtn: { 
    backgroundColor: '#53B175', 
    width: '100%', 
    paddingVertical: 18, 
    borderRadius: 19, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  tryAgainText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  backHomeBtn: { 
    width: '100%', 
    paddingVertical: 15, 
    alignItems: 'center' 
  },
  backHomeText: { 
    color: '#181725', 
    fontSize: 18, 
    fontWeight: '600' 
  }
});

export default ErrorModal;