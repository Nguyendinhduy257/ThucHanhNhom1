import React, { useState, useContext } from 'react';
import { FavouriteContext } from './FavouriteContext';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Modal // Đã bổ sung import Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product = {} } = route?.params || {};
  const [quantity, setQuantity] = useState(1);
  const [isDetailExpanded, setIsDetailExpanded] = useState(true);

  // ĐÃ SỬA: Đưa state này vào BÊN TRONG component
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  // Lấy dữ liệu từ Context
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  // Kiểm tra xem sản phẩm hiện tại đã được tim hay chưa
  // Đảm bảo chỉ báo đỏ (isFavorite = true) khi ID hoặc Name thực sự khớp và TỒN TẠI
  const isFavorite = favourites.some(item => 
    (item.id && product.id && item.id === product.id) || 
    (item.name && product.name && item.name === product.name) ||
    (item.title && product.title && item.title === product.title)
  );

  // 3. TÍNH TOÁN GIÁ (Nằm trong Component để truy cập được biến 'product')
  const basePrice = parseFloat(product.price) || 0;
  const totalPrice = (basePrice * quantity).toFixed(2);

  // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG BẰNG ASYNCSTORAGE ---
  const handleAddToBasket = async () => {
    try {
        const existingCart = await AsyncStorage.getItem('@cart_items');
        let cart = existingCart ? JSON.parse(existingCart) : [];
        
        const productId = product.id;
        const existingIndex = cart.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.title || product.name,
                size: product.subTitle || product.size || '',
                price: parseFloat(product.price) || 0,
                quantity: quantity,
                image: product.imagePath || product.image 
            });
        }
        
        await AsyncStorage.setItem('@cart_items', JSON.stringify(cart));
        
        // 4. HIỂN THỊ MODAL
        setSuccessModalVisible(true);

    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng lúc này.");
    }
  };

  // Nếu không có sản phẩm (bị lỗi truyền tham số), hiển thị thông báo an toàn
  if (!product.title && !product.name) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Không tìm thấy thông tin sản phẩm.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={{ color: '#53B175' }}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Ảnh sản phẩm */}
        <View style={styles.imageContainer}>
          <Image
            source={product.imagePath || product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title || product.name}</Text>
            <TouchableOpacity onPress={() => toggleFavourite(product)}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color={isFavorite ? "#FF4B4B" : "#7C7C7C"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>{product.subTitle || product.size}</Text>

          {/* Chọn số lượng và Giá */}
          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Ionicons name="remove" size={24} color="#B3B3B3" />
              </TouchableOpacity>
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add" size={24} color="#53B175" />
              </TouchableOpacity>
            </View>

            {/* Giá cập nhật tự động */}
            <Text style={styles.price}>${totalPrice}</Text>
          </View>

          {/* Các phần còn lại giữ nguyên... */}
          <View style={styles.divider} />
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsDetailExpanded(!isDetailExpanded)}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name={isDetailExpanded ? "chevron-down" : "chevron-forward"} size={24} color="#181725" />
          </TouchableOpacity>
          {isDetailExpanded && (
            <Text style={styles.description}>
              {product.description || "Mô tả sản phẩm đang được cập nhật."}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={handleAddToBasket}>
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
      
      {/* --- MODAL THÔNG BÁO THÀNH CÔNG --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)} // Dùng cho nút Back trên Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Icon check xanh */}
            <Ionicons name="checkmark-circle" size={60} color="#53B175" style={{ marginBottom: 10 }} />
            
            <Text style={styles.modalTitle}>Thành công!</Text>
            <Text style={styles.modalMessage}>Sản phẩm đã được thêm vào giỏ hàng.</Text>
            
            <View style={styles.modalButtonContainer}>
              {/* Nút ở lại */}
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => setSuccessModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Tiếp tục mua</Text>
              </TouchableOpacity>

              {/* Nút tới Giỏ hàng */}
              <TouchableOpacity 
                style={[styles.actionButton, styles.cartButton]} 
                onPress={() => {
                  setSuccessModalVisible(false); // Tắt Modal trước
                  navigation.navigate('Cart');   // Sang trang Cart
                }}
              >
                <Text style={styles.cartButtonText}>Xem giỏ hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: Platform.OS === 'android' ? 30 : 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    marginTop: 10,
    backgroundColor: '#F8F9F9',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  productImage: {
    width: 250,
    height: 200,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B3B3B3',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 15,
    backgroundColor: '#53B175',
  },
  contentContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 5,
    marginBottom: 25,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBox: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 17,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 5,
    letterSpacing: 0.5,    
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- STYLES CHO MODAL THÔNG BÁO ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 15,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F3F2',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#181725',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#53B175',
    marginLeft: 10,
  },
  cartButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;