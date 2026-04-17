import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DỮ LIỆU MẪU YÊU THÍCH ---
const favouriteData = [
  { 
    id: '1', 
    name: 'Sprite Can', 
    size: '325ml, Price', 
    price: 1.50, 
    image: require('../assets/sprite.png') // Thay bằng ảnh thực tế của bạn
  },
  { 
    id: '2', 
    name: 'Diet Coke', 
    size: '355ml, Price', 
    price: 1.99, 
    image: require('../assets/Coke1.png') 
  },
  { 
    id: '3', 
    name: 'Apple & Grape Juice', 
    size: '2L, Price', 
    price: 15.50, 
    image: require('../assets/appleJuice.png') 
  },
  { 
    id: '4', 
    name: 'Coca Cola Can', 
    size: '325ml, Price', 
    price: 4.99, 
    image: require('../assets/CocacolaCan.png') 
  },
  { 
    id: '5', 
    name: 'Pepsi Can', 
    size: '330ml, Price', 
    price: 4.99, 
    image: require('../assets/pepsiCan.png') 
  },
];

const FavouriteScreen = ({ navigation }) => {

  // --- COMPONENT: Từng Item Yêu Thích ---
  const renderFavouriteItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
      {/* Cột Trái: Ảnh */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>

      {/* Cột Giữa: Thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSize}>{item.size}</Text>
      </View>

      {/* Cột Phải: Giá và Nút mũi tên */}
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={24} color="#181725" style={{ marginLeft: 10 }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      {/* --- DANH SÁCH YÊU THÍCH --- */}
      <FlatList
        data={favouriteData}
        renderItem={renderFavouriteItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* --- NÚT ADD ALL TO CART --- */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.addAllButton} activeOpacity={0.8}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      {/* --- THANH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        {/* Nút Shop */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="storefront-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>

        {/* Nút Explore */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="search-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>

        {/* Nút Cart */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        {/* Nút Favourite - Đang Active */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#53B175" />
          <Text style={[styles.navText, { color: '#53B175' }]}>Favourite</Text>
        </TouchableOpacity>

        {/* Nút Account */}
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
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'android' ? 20 : 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 5,
  },
  productSize: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginHorizontal: 20,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#FFF', // Ẩn viền trên hoặc đổi màu nếu muốn
  },
  addAllButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  addAllText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // --- STYLE BOTTOM NAV ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#181725',
    marginTop: 5,
    fontWeight: '600',
  },
});

export default FavouriteScreen;