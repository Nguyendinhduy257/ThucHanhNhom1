import React, { useContext } from 'react';
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

// --- IMPORT CONTEXT ---
// LƯU Ý: Đổi '../path/to/FavouriteContext' thành đường dẫn thực tế file của bạn
import { FavouriteContext } from './FavouriteContext';

const FavouriteScreen = ({ navigation }) => {
  // Lấy danh sách yêu thích từ Context thay vì dùng dữ liệu cứng
  const { favourites } = useContext(FavouriteContext);

  // --- COMPONENT: Từng Item Yêu Thích ---
  const renderFavouriteItem = ({ item }) => {
    // Xử lý linh hoạt các trường hợp tên biến (tùy thuộc vào product object của bạn)
    const title = item.title || item.name || 'Sản phẩm';
    const subTitle = item.subTitle || item.size || 'Kích thước';
    const price = parseFloat(item.price) || 0;
    const imageSource = item.imagePath || item.image;

    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
        {/* Cột Trái: Ảnh */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.productImage} resizeMode="contain" />
        </View>

        {/* Cột Giữa: Thông tin */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{title}</Text>
          <Text style={styles.productSize}>{subTitle}</Text>
        </View>

        {/* Cột Phải: Giá và Nút mũi tên */}
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#181725" style={{ marginLeft: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
        <Text style={{color: 'red'}}>Tổng số món đang tim: {favourites.length}</Text>
      </View>

      {/* --- DANH SÁCH YÊU THÍCH HOẶC THÔNG BÁO TRỐNG --- */}
      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#E2E2E2" />
          <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderFavouriteItem}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

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
    borderTopColor: '#FFF', 
  },
  addAllButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  addAllText: {
    fontSize: 14,
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
    fontSize: 9,
    color: '#181725',
    marginTop: 5,
    fontWeight: '600',
  },

  // --- STYLE CHO MÀN HÌNH TRỐNG (Mới thêm) ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 15,
    fontWeight: '500',
  }
});

export default FavouriteScreen;