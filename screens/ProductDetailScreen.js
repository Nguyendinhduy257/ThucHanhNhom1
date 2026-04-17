import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route, navigation }) => {
  // Nhận dữ liệu sản phẩm được truyền từ HomeScreen hoặc danh mục
  // Sử dụng fallback rỗng {} đề phòng trường hợp params bị undefined
  const { product = {} } = route?.params || {}; 
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailExpanded, setIsDetailExpanded] = useState(true);

  // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG (GIẢ LẬP) ---
  const handleAddToBasket = () => {
    // Tạm thời dùng Alert, sau này thay bằng logic giỏ hàng (Redux/Context API)
    Alert.alert(
      "Giỏ hàng",
      `Đã thêm ${quantity} x ${product.title || product.name || 'Sản phẩm'} vào giỏ hàng!`,
      [{ text: "OK", style: "cancel" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Nút Back và Share */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Ảnh sản phẩm (Động theo sản phẩm được chọn) */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.imagePath || product.image} 
            style={styles.productImage} 
            resizeMode="contain" 
          />
          {/* Dấu chấm giả lập Carousel */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Tên sản phẩm và nút thả tim */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title || product.name}</Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
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
            <Text style={styles.price}>${product.price}</Text>
          </View>

          {/* Đường kẻ ngang */}
          <View style={styles.divider} />

          {/* Product Detail Section */}
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => setIsDetailExpanded(!isDetailExpanded)}
          >
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name={isDetailExpanded ? "chevron-down" : "chevron-forward"} size={24} color="#181725" />
          </TouchableOpacity>
          {isDetailExpanded && (
            <Text style={styles.description}>
              {product.description || "Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet."}
            </Text>
          )}

          <View style={styles.divider} />

          {/* Nutritions Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.rowCenter}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>100gr</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Review Section */}
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.rowCenter}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={16} color="#F3603F" style={{marginHorizontal: 1}}/>
                ))}
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Nút Add To Basket cố định ở dưới */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={handleAddToBasket} // <-- Gắn sự kiện vào đây
        >
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
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
  },
  description: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 5,
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
});

export default ProductDetailScreen;