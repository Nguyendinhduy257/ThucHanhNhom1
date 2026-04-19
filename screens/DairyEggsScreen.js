import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  Platform,
  TextInput,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tự động tính toán kích thước theo màn hình (Responsive)
const { width } = Dimensions.get('window');
const SCREEN_PADDING = 20;
const COLUMN_GAP = 15;
const CARD_WIDTH = (width - (SCREEN_PADDING * 2) - COLUMN_GAP) / 2;

// --- DỮ LIỆU MẪU SẢN PHẨM (Đã bổ sung category và brand để lọc) ---
const dairyEggsData = [
  { id: '1', name: 'Egg Chicken Red', size: '4pcs, Price', price: '1.99', image: require('../assets/RedEggs.png'), category: 'Eggs', brand: 'Kazi Farmas' },
  { id: '2', name: 'Egg Chicken White', size: '180g, Price', price: '1.50', image: require('../assets/EggsV1.png'), category: 'Eggs', brand: 'Individual Callection' },
  { id: '3', name: 'Egg Pasta', size: '30gm, Price', price: '15.99', image: require('../assets/eggPasta.png'), category: 'Noodles & Pasta', brand: 'Cocola' },
  { id: '4', name: 'Egg Noodles', size: '2L, Price', price: '15.99', image: require('../assets/eggnoodle1.png'), category: 'Noodles & Pasta', brand: 'Ifad' },
  { id: '5', name: 'Mayonnais Eggless', size: '325ml, Price', price: '4.99', image: require('../assets/Mayonnaise-Eggless.png'), category: 'Fast Food', brand: 'Individual Callection' },
  { id: '6', name: 'Egg Noodles Special', size: '330ml, Price', price: '4.99', image: require('../assets/egg-noodle2.png'), category: 'Noodles & Pasta', brand: 'Cocola' },
];

const CATEGORIES = ["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"];
const BRANDS = ["Individual Callection", "Cocola", "Ifad", "Kazi Farmas"];

const DairyEggsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  // Mặc định để mảng rỗng để hiện tất cả, hoặc để giá trị mặc định như bạn muốn
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // --- HÀM CHUẨN HÓA CHUỖI (Tìm kiếm không dấu, không hoa thường, trim) ---
  const normalizeString = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')               // Chuyển về dạng tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu phụ
      .replace(/đ/g, 'd')             // Xử lý riêng chữ đ
      .replace(/Đ/g, 'd');
  };

  // --- LOGIC LỌC DỮ LIỆU (Sử dụng useMemo để tối ưu hiệu năng) ---
  const filteredData = useMemo(() => {
    const searchKey = normalizeString(searchText);

    return dairyEggsData.filter((item) => {
      // 1. Lọc theo từ khóa Search
      const matchesSearch = normalizeString(item.name).includes(searchKey);
      
      // 2. Lọc theo Category (Nếu mảng rỗng thì coi như chọn tất cả)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      
      // 3. Lọc theo Brand
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchText, selectedCategories, selectedBrands]);

  const handleAddToCart = (product) => {
    Alert.alert("Giỏ hàng", `Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const CheckboxItem = ({ label, isChecked, onPress }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
        {isChecked && <Ionicons name="checkmark" size={16} color="#FFF" />}
      </View>
      <Text style={[styles.checkboxLabel, isChecked && styles.checkboxLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productSize}>{item.size}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Search + Filter */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color="#B3B3B3" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Ionicons name="options-outline" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredData}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        )}
      />

      {/* Modal Filter */}
      <Modal animationType="slide" transparent={true} visible={isFilterVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.closeModalBtn}>
                <Ionicons name="close" size={28} color="#181725" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.modalBody}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {CATEGORIES.map((cat, idx) => (
                  <CheckboxItem key={idx} label={cat} isChecked={selectedCategories.includes(cat)} onPress={() => toggleCategory(cat)} />
                ))}

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
                {BRANDS.map((brd, idx) => (
                  <CheckboxItem key={idx} label={brd} isChecked={selectedBrands.includes(brd)} onPress={() => toggleBrand(brd)} />
                ))}
              </ScrollView>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setFilterVisible(false)}>
                  <Text style={styles.applyBtnText}>Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    marginTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 20,
  },
  backButton: { marginRight: 10 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#181725', fontWeight: '600' },
  clearIcon: { padding: 5 },
  filterButton: { marginLeft: 15 },
  listContent: { paddingHorizontal: SCREEN_PADDING, paddingBottom: 30 },
  row: { justifyContent: 'space-between', marginBottom: COLUMN_GAP },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    padding: 15,
  },
  imageContainer: { height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  productImage: { width: '80%', height: '100%' },
  infoContainer: { flex: 1, justifyContent: 'flex-end' },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#181725', marginBottom: 5, minHeight: 36 },
  productSize: { fontSize: 12, color: '#7C7C7C', marginBottom: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#181725' },
  addButton: { backgroundColor: '#53B175', width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#7C7C7C', fontSize: 16 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },
  modalContainer: { flex: 0.85, backgroundColor: '#F8F9F9', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 20, backgroundColor: '#FFF' },
  closeModalBtn: { padding: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  modalBody: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -20, paddingTop: 30 },
  modalScrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#181725', marginBottom: 20 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: '#B3B3B3', alignItems: 'center', justifyContent: 'center', marginRight: 15, backgroundColor: '#FFF' },
  checkboxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  checkboxLabelActive: { color: '#53B175' },
  modalFooter: { paddingHorizontal: 25, paddingBottom: Platform.OS === 'ios' ? 40 : 25, paddingTop: 15 },
  applyBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default DairyEggsScreen;