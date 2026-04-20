import React, { useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    FlatList, 
    TouchableOpacity, 
    Modal,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    
    // State quản lý hiển thị Modal thông báo
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

    // --- TẢI DỮ LIỆU ĐƠN HÀNG ---
    useFocusEffect(
        useCallback(() => {
            const loadOrders = async () => {
                try {
                    const storedOrders = await AsyncStorage.getItem('@orders');
                    if (storedOrders) {
                        setOrders(JSON.parse(storedOrders));
                    }
                } catch (error) {
                    console.log("Lỗi tải đơn hàng:", error);
                }
            };
            loadOrders();
        }, [])
    );

    // --- HÀM XÁC NHẬN ĐÃ NHẬN HÀNG ---
    const handleConfirmReceived = async (orderId) => {
        try {
            // Cập nhật trạng thái isReceived = true cho đơn hàng được chọn
            const updatedOrders = orders.map(order => 
                order.id === orderId ? { ...order, isReceived: true } : order
            );
            
            // Lưu lại vào state và AsyncStorage
            setOrders(updatedOrders);
            await AsyncStorage.setItem('@orders', JSON.stringify(updatedOrders));
            
            // Hiện Modal thông báo thành công
            setConfirmModalVisible(true);
        } catch (error) {
            console.log("Lỗi xác nhận đơn hàng:", error);
        }
    };

    // --- HÀM XÓA HÓA ĐƠN ---
    // --- HÀM XÓA VĨNH VIỄN HÓA ĐƠN ---
    const handleDeleteOrder = (orderId) => {
        // Cảnh báo người dùng về việc xóa vĩnh viễn
        Alert.alert(
            "Xóa vĩnh viễn hóa đơn",
            "Hành động này sẽ xóa vĩnh viễn đơn hàng khỏi thiết bị và không thể khôi phục. Bạn có chắc chắn không?",
            [
                { text: "Hủy", style: "cancel" },
                { 
                    text: "Xóa vĩnh viễn", 
                    style: "destructive", // Giúp nút có màu đỏ trên iOS
                    onPress: async () => {
                        try {
                            // 1. Lọc bỏ đơn hàng bị xóa khỏi mảng hiện tại
                            const updatedOrders = orders.filter(order => order.id !== orderId);
                            
                            // 2. Cập nhật lại giao diện (biến mất khỏi màn hình)
                            setOrders(updatedOrders);
                            
                            // 3. XÓA VĨNH VIỄN (Ghi đè) trong bộ nhớ máy (AsyncStorage)
                            await AsyncStorage.setItem('@orders', JSON.stringify(updatedOrders));
                            
                            // 4. Báo cáo thành công
                            Alert.alert("Thành công", "Đã xóa vĩnh viễn đơn hàng!");
                        } catch (error) {
                            console.log("Lỗi khi xóa hóa đơn:", error);
                            Alert.alert("Lỗi", "Không thể xóa đơn hàng lúc này.");
                        }
                    }
                }
            ]
        );
    };

    // --- COMPONENT HIỂN THỊ TỪNG ĐƠN HÀNG ---
    const renderOrderItem = ({ item }) => {
        // Kiểm tra xem đơn hàng đã được xác nhận nhận chưa (nếu undefined thì coi như chưa)
        const isReceived = item.isReceived || false;

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Mã đơn: #{item.id.slice(-6)}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                
                <View style={styles.orderBody}>
                    {item.items.map((prod, index) => (
                        <Text key={index} style={styles.productItem}>
                            • {prod.quantity}x {prod.name}
                        </Text>
                    ))}
                </View>

                <View style={styles.orderFooter}>
                    <Text style={styles.orderTotalText}>Tổng thanh toán:</Text>
                    <Text style={styles.orderTotalAmount}>${item.totalAmount}</Text>
                </View>

                {/* --- KHU VỰC NÚT BẤM (XÁC NHẬN & XÓA) --- */}
                <View style={styles.actionButtonsRow}>
                    {/* Nút Xác nhận (Sẽ ẩn hoặc đổi dạng nếu đã nhận) */}
                    {!isReceived ? (
                        <TouchableOpacity 
                            style={styles.confirmButton} 
                            onPress={() => handleConfirmReceived(item.id)}
                        >
                            <Text style={styles.confirmButtonText}>Đã nhận hàng</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.receivedBadge}>
                            <Ionicons name="checkmark-circle" size={16} color="#53B175" />
                            <Text style={styles.receivedText}>Đã hoàn thành</Text>
                        </View>
                    )}

                    {/* Nút Xóa Hóa Đơn (Disable nếu chưa nhận hàng) */}
                    <TouchableOpacity 
                        style={[
                            styles.deleteButton, 
                            !isReceived && styles.deleteButtonDisabled // Thêm style làm mờ nếu chưa nhận
                        ]} 
                        disabled={!isReceived} // Khóa không cho bấm
                        onPress={() => handleDeleteOrder(item.id)}
                    >
                        <Text style={[
                            styles.deleteButtonText,
                            !isReceived && styles.deleteButtonTextDisabled
                        ]}>
                            Xóa hóa đơn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#181725" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order History</Text>
                <View style={{ width: 28 }} />
            </View>

            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="receipt-outline" size={64} color="#B3B3B3" />
                    <Text style={styles.emptyText}>Chưa có đơn hàng nào.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {/* --- MODAL XÁC NHẬN THÀNH CÔNG --- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isConfirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={60} color="#53B175" style={{ marginBottom: 10 }} />
                        <Text style={styles.modalTitle}>Cảm ơn bạn!</Text>
                        <Text style={styles.modalMessage}>Đơn hàng đã được xác nhận giao thành công.</Text>
                        
                        <TouchableOpacity 
                            style={styles.closeModalButton} 
                            onPress={() => setConfirmModalVisible(false)}
                        >
                            <Text style={styles.closeModalButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
    listContent: { padding: 20 },
    orderCard: { backgroundColor: '#F8F9F9', padding: 15, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#E2E2E2' },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10, marginBottom: 10 },
    orderId: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
    orderDate: { fontSize: 14, color: '#7C7C7C' },
    orderBody: { marginBottom: 15 },
    productItem: { fontSize: 14, color: '#181725', marginBottom: 5 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', paddingTop: 10, paddingBottom: 15 },
    orderTotalText: { fontSize: 16, color: '#7C7C7C' },
    orderTotalAmount: { fontSize: 18, fontWeight: 'bold', color: '#53B175' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#7C7C7C', marginTop: 15 },
    
    // --- Style cho Action Buttons ---
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
        paddingTop: 15
    },
    confirmButton: {
        backgroundColor: '#53B175',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    confirmButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14
    },
    receivedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        paddingVertical: 10,
    },
    receivedText: {
        color: '#53B175',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5
    },
    deleteButton: {
        backgroundColor: '#FFE5E5', // Đỏ nhạt
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center'
    },
    deleteButtonText: {
        color: '#E74C3C', // Đỏ đậm
        fontWeight: 'bold',
        fontSize: 14
    },
    // Trạng thái bị khóa (Disabled)
    deleteButtonDisabled: {
        backgroundColor: '#F2F3F2', 
    },
    deleteButtonTextDisabled: {
        color: '#B3B3B3',
    },

    // --- Style cho Modal ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
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
        marginBottom: 20,
    },
    closeModalButton: {
        backgroundColor: '#53B175',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    closeModalButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default OrderScreen;