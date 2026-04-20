import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// IMPORT DỮ LIỆU TỪ FILE DATA
import { productsData } from '../data';

// --- CẤU HÌNH RESPONSIVE ---
const { width, height } = Dimensions.get('window');
const SCREEN_MARGIN = 25; 
const CARD_WIDTH = width * 0.43; 

// --- HÀM CHUẨN HÓA CHUỖI TÌM KIẾM ---
const formatSearchString = (str) => {
  if (!str) return '';
  return str
    .normalize("NFD")                    // Tách các ký tự có dấu thành ký tự gốc và dấu
    .replace(/[\u0300-\u036f]/g, "")     // Xóa tất cả các dấu (kể cả dấu sắc, huyền, hỏi, ngã, nặng)
    .replace(/đ/g, "d").replace(/Đ/g, "D")// Xử lý riêng chữ đ/Đ của tiếng Việt
    .replace(/\s+/g, "")                 // Xóa toàn bộ khoảng trắng
    .toLowerCase();                      // Chuyển tất cả về chữ thường
};

// --- COMPONENT CON: Thẻ Sản Phẩm ---
const ProductCard = ({ product, navigation }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductDetail', { product })}
      style={styles.imageWrapper}
    >
      <Image source={product.imagePath} style={styles.cardImage} resizeMode="contain" />
    </TouchableOpacity>
    
    <View>
      <Text style={styles.cardTitle} numberOfLines={1}>{product.title}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>{product.subTitle}</Text>
    </View>
    
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>${product.price}</Text>
      <TouchableOpacity 
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDetail', { product })}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  </View>
);

// --- COMPONENT CON: Tiêu đề Mục ---
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('Pulses');
  const [activeTab, setActiveTab] = useState('Shop');
  
  // STATE LƯU TRỮ TỪ KHÓA TÌM KIẾM
  const [searchQuery, setSearchQuery] = useState('');

  // --- LỌC DỮ LIỆU TÌM KIẾM MỚI ---
  const searchResults = productsData.filter(item => {
    const formattedTitle = formatSearchString(item.title);
    const formattedQuery = formatSearchString(searchQuery);
    // Kiểm tra xem tên sản phẩm đã chuẩn hóa có chứa từ khóa đã chuẩn hóa không
    return formattedTitle.includes(formattedQuery);
  });

  // LỌC DỮ LIỆU THEO DANH MỤC CỐ ĐỊNH
  const exclusiveOffers = productsData.filter(item => item.category === "Exclusive Offer");
  const bestSelling = productsData.filter(item => item.category === "Best Selling");
  const meats = productsData.filter(item => item.category === "Meat");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/carrotLogo.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4F4D" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181B19" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          {/* Nút xóa nhanh từ khóa nếu đang có text */}
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>

        {/* XỬ LÝ ĐIỀU KIỆN HIỂN THỊ */}
        {searchQuery.trim() !== '' ? (
          // HIỂN THỊ KẾT QUẢ TÌM KIẾM
          <View>
             <SectionHeader title={`Search Results (${searchResults.length})`} />
             <View style={styles.searchGridContainer}>
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <View key={product.id} style={{ marginBottom: 15 }}>
                      <ProductCard navigation={navigation} product={product} />
                    </View>
                  ))
                ) : (
                  <Text style={styles.noResultText}>No products found matching "{searchQuery}"</Text>
                )}
             </View>
          </View>
        ) : (
          // HIỂN THỊ GIAO DIỆN TRANG CHỦ MẶC ĐỊNH KHI KHÔNG TÌM KIẾM
          <>
            {/* Banner */}
            <View style={styles.bannerContainer}>
              <Image 
                source={require('../assets/AnhTraiCayV2.png')} 
                style={styles.bannerImage}
                resizeMode="stretch" 
              />
            </View>

            {/* Exclusive Offer */}
            <SectionHeader title="Exclusive Offer" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
              {exclusiveOffers.map((product) => (
                <ProductCard key={product.id} navigation={navigation} product={product} />
              ))}
            </ScrollView>

            {/* Best Selling */}
            <SectionHeader title="Best Selling" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
              {bestSelling.map((product) => (
                <ProductCard key={product.id} navigation={navigation} product={product} />
              ))}
            </ScrollView>

            {/* Groceries Section with Highlight */}
            <SectionHeader title="Groceries" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollContent}>
              <TouchableOpacity 
                style={[
                    styles.categoryCard, 
                    { backgroundColor: '#F8A44C33' },
                    activeCategory === 'Pulses' && styles.categoryActive
                ]}
                onPress={() => setActiveCategory('Pulses')}
              >
                <Image source={require('../assets/AnhNguCoc.png')} style={styles.categoryImage} resizeMode="contain"/>
                <Text style={styles.categoryText}>Pulses</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                    styles.categoryCard, 
                    { backgroundColor: '#53B17533' },
                    activeCategory === 'Rice' && styles.categoryActive
                ]}
                onPress={() => setActiveCategory('Rice')}
              >
                <Image source={require('../assets/AnhBaoGao.png')} style={styles.categoryImage} resizeMode="contain"/>
                <Text style={styles.categoryText}>Rice</Text>
              </TouchableOpacity>
            </ScrollView>
            
            {/* Phần danh sách thịt */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalScrollContent, { marginBottom: 40 }]}>
              {meats.map((product) => (
                <ProductCard key={product.id} navigation={navigation} product={product} />
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.bottomNav}>
            {[
                { name: 'Shop', icon: 'storefront', screen: 'Home' },
                { name: 'Explore', icon: 'search', screen: 'Explore' },
                { name: 'Cart', icon: 'cart', screen: 'Cart' },
                { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
                { name: 'Account', icon: 'person', screen: 'Profile' }
            ].map((tab) => {
                const isActive = activeTab === tab.name;
                return (
                    <TouchableOpacity 
                        key={tab.name}
                        style={styles.navItem} 
                        onPress={() => {
                            setActiveTab(tab.name);
                            if(tab.screen !== 'Home') navigation.navigate(tab.screen);
                        }}
                    >
                        <Ionicons 
                            name={isActive ? tab.icon : `${tab.icon}-outline`} 
                            size={24} 
                            color={isActive ? "#53B175" : "#181725"} 
                        />
                        <Text style={[styles.navText, { color: isActive ? "#53B175" : "#181725" }]}>
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { paddingBottom: 120 }, 
  
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 10,
    marginBottom: 20,
  },
  logo: { width: 30, height: 35, marginBottom: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, color: '#4C4F4D', fontWeight: '600', marginLeft: 5 },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: SCREEN_MARGIN,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#181B19', fontWeight: '600' },
  
  searchGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_MARGIN,
  },
  noResultText: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 20,
    width: '100%'
  },

  bannerContainer: {
    marginHorizontal: SCREEN_MARGIN,
    height: width * 0.3,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 25,
  },
  bannerImage: { width: '100%', height: '100%' },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SCREEN_MARGIN,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  seeAllText: { fontSize: 16, color: '#53B175', fontWeight: '600' },
  
  horizontalScrollContent: { paddingLeft: SCREEN_MARGIN, paddingRight: 10 },
  
  cardContainer: {
    width: CARD_WIDTH,
    minHeight: 220,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 12,
    marginRight: 15,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  imageWrapper: { alignItems: 'center', marginVertical: 5 },
  cardImage: { width: '85%', height: 80 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginTop: 10 },
  cardSubtitle: { fontSize: 14, color: '#7C7C7C', marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: {
    backgroundColor: '#53B175',
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryScrollContent: { paddingLeft: SCREEN_MARGIN, paddingRight: 10, marginBottom: 20 },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
    marginRight: 15,
    width: width * 0.6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryActive: {
    borderColor: '#53B175',
    borderWidth: 2,
  },
  categoryImage: { width: 60, height: 60, marginRight: 12 },
  categoryText: { fontSize: 18, fontWeight: '600', color: '#3E423F' },

  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
    height: Platform.OS === 'ios' ? 95 : 80,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15, 
    
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 20,
  },
  navItem: { alignItems: 'center', flex: 1, paddingTop: 10 },
  navText: { fontSize: 9, fontWeight: '600', marginTop: 4 }
});

export default HomeScreen;