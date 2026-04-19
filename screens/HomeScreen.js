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

// --- CẤU HÌNH RESPONSIVE ---
const { width, height } = Dimensions.get('window');
const SCREEN_MARGIN = 25; 
const CARD_WIDTH = width * 0.43; 

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
  // State để highlight danh mục (Groceries)
  const [activeCategory, setActiveCategory] = useState('Pulses');
  // State để highlight Bottom Tab
  const [activeTab, setActiveTab] = useState('Shop');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
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
          />
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../assets/AnhTraiCayV2.png')} 
            style={styles.bannerImage}
            resizeMode="stretch" 
          />
        </View>

        {/* Exclusive Offer - ĐÃ THÊM ID */}
        <SectionHeader title="Exclusive Offer" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_1', imagePath: require('../assets/AnhTraiChuoi.png'), title: "Organic Bananas", subTitle: "7pcs, Priceg", price: "4.99" }} 
          />
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_2', imagePath: require('../assets/AnhTraiTao.png'), title: "Red Apple", subTitle: "1kg, Priceg", price: "2.99" }} 
          />
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_3', imagePath: require('../assets/EggsV1.png'), title: "Fresh Eggs", subTitle: "10pcs, Priceg", price: "6.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_4', imagePath: require('../assets/eggPasta.png'), title: "Egg Pastal", subTitle: "1kg, Priceg", price: "8.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_5', imagePath: require('../assets/eggnoodle1.png'), title: "Egg Noodle", subTitle: "1kg, Priceg", price: "12.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'ex_6', imagePath: require('../assets/DairyAndEgg.png'), title: "Milk Cheese", subTitle: "1kg, Priceg", price: "21.99" }} 
          />
        </ScrollView>

        {/* Best Selling - ĐÃ THÊM ID */}
        <SectionHeader title="Best Selling" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'bs_1', imagePath: require('../assets/AnhOtChuong.png'), title: "Bell Pepper Red", subTitle: "1kg, Priceg", price: "4.99" }} 
          />
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'bs_2', imagePath: require('../assets/Coke1.png'), title: "Diet Coke", subTitle: "250gm, Priceg", price: "1.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'bs_3', imagePath: require('../assets/DairyAndEgg.png'), title: "Milk Cheese", subTitle: "550gm, Priceg", price: "14.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'bs_4', imagePath: require('../assets/EggsV1.png'), title: "White Egg", subTitle: "350gm, Priceg", price: "9.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'bs_5', imagePath: require('../assets/sprite.png'), title: "Sprite", subTitle: "250ml, Priceg", price: "17.99" }} 
          />
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
        
        {/* Phần danh sách thịt - ĐÃ THÊM ID */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalScrollContent, { marginBottom: 40 }]}>
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'meat_1', imagePath: require('../assets/AnhMiengThit.png'), title: "Beef Bone", subTitle: "1kg, Priceg", price: "14.99" }} 
          />
          <ProductCard 
            navigation={navigation} 
            product={{ id: 'meat_2', imagePath: require('../assets/AnhThitGa.png'), title: "Broiler Chicken", subTitle: "1kg, Priceg", price: "4.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'meat_3', imagePath: require('../assets/AnhMiengThit.png'), title: "Beef Bone", subTitle: "1kg, Priceg", price: "9.99" }} 
          />
                    <ProductCard 
            navigation={navigation} 
            product={{ id: 'meat_4', imagePath: require('../assets/AnhThitGa.png'), title: "Broiler Chicken", subTitle: "1kg, Priceg", price: "24.99" }} 
          />
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation với Highlight và khoảng cách an toàn */}
      <View style={styles.navContainer}>
        <View style={styles.bottomNav}>
            {[
                { name: 'Shop', icon: 'storefront', screen: 'Home' },
                { name: 'Explore', icon: 'search', screen: 'Explore' },
                { name: 'Cart', icon: 'cart', screen: 'Cart' },
                { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
                { name: 'Account', icon: 'person', screen: 'Account' }
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
  // Tăng paddingBottom để nội dung không bị che mất bởi thanh điều hướng nổi
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
    borderColor: 'transparent', // Giữ viền trong suốt khi không active
  },
  categoryActive: {
    borderColor: '#53B175', // Viền xanh khi được chọn
    borderWidth: 2,
  },
  categoryImage: { width: 60, height: 60, marginRight: 12 },
  categoryText: { fontSize: 18, fontWeight: '600', color: '#3E423F' },

  // CẢI TIẾN BOTTOM NAV ĐỂ KHÔNG BỊ VƯỚNG CHÂN:
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
    
    // Tạo khoảng đệm dưới chân cho máy cũ và máy mới
    height: Platform.OS === 'ios' ? 95 : 80,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15, 
    
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
    
    // Bóng đổ chuyên nghiệp
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