import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu mẫu: Các tỉnh thành và Quận/Huyện tương ứng của Việt Nam
const locationData = {
  "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Cầu Giấy", "Quận Đống Đa", "Quận Tây Hồ","Nam Từ Liêm","Đông Anh","Gia Lâm","Thanh Trì","Hoài Đức","Đan Phượng","Phúc Thọ","Thạch Thất","Sơn Tây"],
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Quận 10", "Quận Tân Bình", "Quận Bình Thạnh", "Quận Phú Nhuận", "Quận Gò Vấp", "Quận Tân Phú", "Quận 12", "Huyện Hóc Môn", "Huyện Củ Chi", "Huyện Nhà Bè"],
  "Đà Nẵng": ["Quận Hải Châu", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Thanh Khê", "Huyện Hòa Vang", "Huyện Hoàng Sa"],
  "Cần Thơ": ["Quận Ninh Kiều", "Quận Bình Thuỷ", "Quận Cái Răng", "Quận Ô Môn", "Huyện Phong Điền", "Huyện Cờ Đỏ", "Huyện Thới Lai"],
  "Hải Phòng": ["Quận Hồng Bàng", "Quận Lê Chân", "Quận Ngô Quyền", "Quận Kiến An", "Quận Hải An", "Huyện An Dương", "Huyện An Lão", "Huyện Kiến Thụy", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo"],
  "Đà Nẵng": ["Quận Hải Châu", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Thanh Khê", "Huyện Hòa Vang", "Huyện Hoàng Sa"],
  "Hải Phòng": ["Quận Hồng Bàng", "Quận Lê Chân", "Quận Ngô Quyền", "Quận Kiến An", "Quận Hải An", "Huyện An Dương", "Huyện An Lão", "Huyện Kiến Thụy", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo"],
  "Khác":["Khác"]
};

const zones = Object.keys(locationData); // Danh sách tỉnh/thành phố

const LocationScreen = ({ navigation }) => {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');

  // Quản lý trạng thái bật/tắt Modal
  const [isZoneModalVisible, setZoneModalVisible] = useState(false);
  const [isAreaModalVisible, setAreaModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!zone || !area) {
      alert('Vui lòng chọn đầy đủ Thành phố và Khu vực!');
      return;
    }
    console.log('Vị trí đã chọn:', { zone, area });
    // Điều hướng sang màn hình LoginFinal
    navigation.navigate('LoginFinal');
    // TODO: Chuyển sang màn hình chính (Home)
    // navigation.navigate('Home');
  };

  // Hàm chọn Tỉnh/Thành
  const handleSelectZone = (selectedZone) => {
    setZone(selectedZone);
    setArea(''); // Reset lại Area khi Zone thay đổi
    setZoneModalVisible(false); // Tắt modal
  };

  // Hàm chọn Quận/Huyện
  const handleSelectArea = (selectedArea) => {
    setArea(selectedArea);
    setAreaModalVisible(false); // Tắt modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/googleMap.png')} 
            style={styles.mapImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Switch on your location to stay in tune with{'\n'}what's happening in your area
          </Text>
        </View>

        <View style={styles.formContainer}>
          
          {/* Dropdown 1: Your Zone (Thành phố) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Zone</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setZoneModalVisible(true)}>
              <Text style={[styles.dropdownText, !zone && styles.placeholderText]}>
                {zone || 'Select your city/province'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          {/* Dropdown 2: Your Area (Quận/Huyện) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Area</Text>
            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => {
                if (!zone) {
                  alert('Vui lòng chọn Your Zone trước!');
                  return;
                }
                setAreaModalVisible(true);
              }}
            >
              <Text style={[styles.dropdownText, !area && styles.placeholderText]}>
                {area || 'Select your district'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- MODAL CHỌN ZONE (THÀNH PHỐ) --- */}
      <Modal visible={isZoneModalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setZoneModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Zone</Text>
              <FlatList
                data={zones}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectZone(item)}>
                    <Text style={[styles.modalItemText, zone === item && styles.modalItemTextSelected]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* --- MODAL CHỌN AREA (QUẬN/HUYỆN) --- */}
      <Modal visible={isAreaModalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setAreaModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Area in {zone}</Text>
              <FlatList
                data={zone ? locationData[zone] : []} // Lấy danh sách quận dựa vào tỉnh đã chọn
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectArea(item)}>
                    <Text style={[styles.modalItemText, area === item && styles.modalItemTextSelected]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 25, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 20, marginLeft: -5 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  imageContainer: { alignItems: 'center', marginBottom: 40 },
  mapImage: { width: 220, height: 170, marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', lineHeight: 22 },
  formContainer: { marginBottom: 40 },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '600', marginBottom: 10 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 15 },
  dropdownText: { fontSize: 18, color: '#181725' },
  placeholderText: { color: '#B3B3B3' },
  buttonContainer: { marginTop: 'auto' },
  submitButton: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  // --- Styles cho Modal (Dropdown Picker) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Nền mờ tối
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    maxHeight: '60%', // Không cho danh sách dài tràn màn hình
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#181725',
    textAlign: 'center',
  },
  modalItemTextSelected: {
    color: '#53B175', // Chữ xanh khi mục đó đang được chọn
    fontWeight: 'bold',
  }
});

export default LocationScreen;