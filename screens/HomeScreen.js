import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- COMPONENT CON: Thẻ Sản Phẩm ---
const ProductCard = ({ product, navigation }) => (
  <View style={styles.cardContainer}>
    {/* Ấn vào ảnh chuyển sang chi tiết */}
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductDetail', { product })}
      style={{ alignItems: 'center' }}
    >
      <Image source={product.imagePath} style={styles.cardImage} resizeMode="contain" />
    </TouchableOpacity>
    
    <Text style={styles.cardTitle}>{product.title}</Text>
    <Text style={styles.cardSubtitle}>{product.subTitle}</Text>
    
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>${product.price}</Text>
      {/* Ấn vào dấu + cũng chuyển sang chi tiết */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('ProductDetail', { product })}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  </View>
);

// --- COMPONENT CON: Tiêu đề Mục (Section Header) ---
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

// --- MÀN HÌNH CHÍNH ---
// CẬP NHẬT: Thêm { navigation } vào props của HomeScreen
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header: Logo & Location */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/carrotLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
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
            source={require('../assets/AnhTraiCayV2.png') } 
            style={styles.bannerImage}
            resizeMode="fit"
          />
        </View>

        {/* Exclusive Offer Section */}
        <SectionHeader title="Exclusive Offer" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {/* CẬP NHẬT: Gom các props thành object product */}
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhTraiChuoi.png'),
              title: "Organic Bananas",
              subTitle: "7pcs, Priceg",
              price: "4.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhTraiTao.png'),
              title: "Red Apple",
              subTitle: "1kg, Priceg",
              price: "2.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/EggsV1.png'),
              title: "Fresh Eggs",
              subTitle: "10pcs, Priceg",
              price: "6.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/RedEggs.png'),
              title: "Fresh RedEggs",
              subTitle: "10pcs, Priceg",
              price: "9.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/GioTraiCay.png'),
              title: "Fresh vegetables",
              subTitle: "15pcs, Priceg",
              price: "11.99"
            }} 
          />
        </ScrollView>

        {/* Best Selling Section */}
        <SectionHeader title="Best Selling" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhOtChuong.png'),
              title: "Bell Pepper Red",
              subTitle: "1kg, Priceg",
              price: "4.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhCuGung.png'),
              title: "Ginger",
              subTitle: "250gm, Priceg",
              price: "4.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/CocacolaCan.png'),
              title: "Coca Cola",
              subTitle: "250ml, Priceg",
              price: "2.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/Coke1.png'),
              title: "Coke",
              subTitle: "250ml, Priceg",
              price: "2.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/appleJuice.png'),
              title: "Apple Juice",
              subTitle: "250ml, Priceg",
              price: "5.99"
            }} 
          />
        </ScrollView>

        {/* Groceries Section */}
        <SectionHeader title="Groceries" />
        {/* Categories inside Groceries */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={[styles.categoryCard, { backgroundColor: '#F8A44C33' }]}>
            <Image source={require('../assets/AnhNguCoc.png')} style={styles.categoryImage} resizeMode="contain"/>
            <Text style={styles.categoryText}>Pulses</Text>
          </View>
          <View style={[styles.categoryCard, { backgroundColor: '#53B17533' }]}>
            <Image source={require('../assets/AnhBaoGao.png')} style={styles.categoryImage} resizeMode="contain"/>
            <Text style={styles.categoryText}>Rice</Text>
          </View>
        </ScrollView>
        
        {/* Grocery Products */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhMiengThit.png'),
              title: "Beef Bone",
              subTitle: "1kg, Priceg",
              price: "4.99"
            }} 
          />
          <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhThitGa.png'),
              title: "Broiler Chicken",
              subTitle: "1kg, Priceg",
              price: "4.99"
            }} 
          />
                    <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhBaoGao.png'),
              title: "Rice Type A",
              subTitle: "1kg, Priceg",
              price: "19.99"
            }} 
          />
                    <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhNguCoc.png'),
              title: "Quality A1",
              subTitle: "1kg, Priceg",
              price: "8.99"
            }} 
          />
                    <ProductCard 
            navigation={navigation}
            product={{
              imagePath: require('../assets/AnhMiengThit.png'),
              title: "Beef Bone",
              subTitle: "1kg, Priceg",
              price: "4.99"
            }} 
          />
        </ScrollView>

      </ScrollView>

      {/* Thanh Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="storefront-outline" size={24} color="#53B175" />
          <Text style={[styles.navText, { color: '#53B175' }]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => navigation.navigate('Explore')}>
          <Ionicons name="search-outline" size={24} color="#181725" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
          onPress={() => navigation.navigate('Cart')}>
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
  scrollContent: {
    paddingBottom: 100, 
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 10,
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 35,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#4C4F4D',
    fontWeight: '600',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#181B19',
    fontWeight: '600',
  },
  bannerContainer: {
    marginHorizontal: 25,
    height: 115,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  seeAllText: {
    fontSize: 16,
    color: '#53B175',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 25,
    marginBottom: 30,
  },
  cardContainer: {
    width: 170,
    height: 250,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
    backgroundColor: '#FFF',
  },
  cardImage: {
    width: '100%',
    height: 90,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  addButton: {
    backgroundColor: '#53B175',
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryScroll: {
    paddingLeft: 25,
    marginBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 18,
    marginRight: 15,
    width: 250,
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3E423F',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
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
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    color: '#181725',
  }
});

export default HomeScreen;