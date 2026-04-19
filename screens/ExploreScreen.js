import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  Platform,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Lấy chiều rộng màn hình
const { width } = Dimensions.get('window');

// Thiết lập thông số layout để tính toán Card động
const SCREEN_PADDING = 20; // Padding hai bên của màn hình
const COLUMN_GAP = 15;     // Khoảng cách giữa 2 thẻ
const CARD_WIDTH = (width - (SCREEN_PADDING * 2) - COLUMN_GAP) / 2;

// --- DỮ LIỆU MẪU CHO DANH MỤC ---
const categories = [
  { 
    id: '1', 
    name: 'Fresh Fruits\n& Vegetable', 
    image: require('../assets/GioHangTraiCayFinal.png'), 
    bgColor: '#EEF8F2', 
    borderColor: '#53B175' 
  },
  { 
    id: '2', 
    name: 'Cooking Oil\n& Ghee', 
    image: require('../assets/CookingOil.png'), 
    bgColor: '#FFF6EE', 
    borderColor: '#F8A44C' 
  },
  { 
    id: '3', 
    name: 'Meat & Fish', 
    image: require('../assets/meatAndFish.png'), 
    bgColor: '#FDECEC', 
    borderColor: '#F7A593' 
  },
  { 
    id: '4', 
    name: 'Bakery & Snacks', 
    image: require('../assets/bakeryAndSnack.png'), 
    bgColor: '#F4EBF7', 
    borderColor: '#D3B0E0' 
  },
  { 
    id: '5', 
    name: 'Dairy & Eggs', 
    image: require('../assets/DairyAndEgg.png'), 
    bgColor: '#FFFCEB', 
    borderColor: '#FDE598' 
  },
  { 
    id: '6', 
    name: 'Beverages', 
    image: require('../assets/beverages.png'), 
    bgColor: '#EDF7FC', 
    borderColor: '#B7DFF5' 
  },
];

const ExploreScreen = ({ navigation }) => {

  // --- COMPONENT CON: Thẻ Danh Mục ---
  const renderCategoryCard = ({ item }) => (
   <TouchableOpacity 
      activeOpacity={0.7}
      style={[styles.cardContainer, { backgroundColor: item.bgColor, borderColor: item.borderColor }]}
      onPress={() => {
        if (item.name === 'Beverages') {
          navigation.navigate('Beverages'); // Mở trang Beverages
        } else if (item.name === 'Dairy & Eggs') {
          navigation.navigate('DairyEggs'); // Mở trang Dairy & Eggs
        } else {
          console.log(`Chưa có màn hình cho ${item.name}`);
        }
      }}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Tiêu đề trang */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Products</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#181B19" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          returnKeyType="search"
        />
      </View>

      {/* Lưới danh mục sản phẩm */}
      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // Hai thuộc tính dưới giúp tắt bàn phím mượt mà khi người dùng cuộn danh sách
        keyboardDismissMode="on-drag" 
        keyboardShouldPersistTaps="handled"
      />

      {/* Thanh Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="storefront-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#53B175" />
          <Text style={[styles.navText, { color: '#53B175' }]}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.navItem} 
  onPress={() => navigation.navigate('Favourite')} 
>
  <Ionicons name="heart-outline" size={24} color="#181725" />
  <Text style={styles.navText}>Favourite</Text>
</TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 10,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: SCREEN_PADDING, // Đồng bộ margin với padding của list
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
searchInput: {
  flex: 1,
  fontSize: 14,
  color: '#181B19',
  fontWeight: '600',
  height: '100%',
  paddingVertical: 8, // Thêm khoảng đệm trên/dưới
  borderRadius: 15, // Bo góc cho TextInput
  backgroundColor: '#F2F3F2', // Nền trùng với container để tạo hiệu ứng bo góc
  // Hoặc dùng lineHeight nếu muốn căn giữa theo cách khác:
  // lineHeight: 20,
},
  listContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 110, // Tăng thêm một chút để không bị cấn với shadow của Bottom Nav
  },
  row: {
    justifyContent: 'space-between', // Tự động căn đều 2 bên
    marginBottom: COLUMN_GAP,
  },
  cardContainer: {
    width: CARD_WIDTH, // Sử dụng công thức toán học tính ở trên
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cardImage: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 70, // Tương thích vùng an toàn (Home Indicator) của iOS
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, 
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Để các nút có vùng chạm đều nhau
    height: '100%',
  },
  navText: {
    fontSize: 9, 
    fontWeight: '600',
    marginTop: 5,
    color: '#181725',
  }
});

export default ExploreScreen;