import React, { useState } from 'react';
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

// --- DỮ LIỆU MẪU GIỎ HÀNG ---
const initialCartData = [
    {
        id: '1',
        name: 'Bell Pepper Red',
        size: '1kg, Price',
        price: 4.99,
        quantity: 1,
        image: require('../assets/AnhOtChuong.png')
    },
    {
        id: '2',
        name: 'Egg Chicken Red',
        size: '4pcs, Price',
        price: 1.99,
        quantity: 1,
        image: require('../assets/RedEggs.png')
    },
    {
        id: '3',
        name: 'Organic Bananas',
        size: '12kg, Price',
        price: 3.00,
        quantity: 1,
        image: require('../assets/AnhTraiChuoi.png')
    },
    {
        id: '4',
        name: 'Ginger',
        size: '250gm, Price',
        price: 2.99,
        quantity: 1,
        image: require('../assets/AnhCuGung.png')
    },
];

// Thêm prop navigation để dùng được tính năng chuyển trang
const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState(initialCartData);

    // --- CÁC HÀM XỬ LÝ SỐ LƯỢNG ---
    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Tính tổng tiền
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // --- COMPONENT: Từng Sản phẩm trong giỏ ---
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            {/* Cột Trái: Ảnh */}
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            </View>

            {/* Cột Phải: Thông tin sản phẩm */}
            <View style={styles.infoContainer}>

                {/* Hàng 1: Tên và Nút Xóa */}
                <View style={styles.nameRow}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                        <Ionicons name="close" size={24} color="#B3B3B3" />
                    </TouchableOpacity>
                </View>

                {/* Hàng 2: Khối lượng / Kích thước */}
                <Text style={styles.productSize}>{item.size}</Text>

                {/* Hàng 3: Điều chỉnh số lượng và Giá tiền */}
                <View style={styles.actionRow}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityBtn}
                            onPress={() => decreaseQuantity(item.id)}
                        >
                            <Ionicons name="remove" size={20} color="#B3B3B3" />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.quantityBtn}
                            onPress={() => increaseQuantity(item.id)}
                        >
                            <Ionicons name="add" size={20} color="#53B175" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>

            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
            </View>

            {/* --- DANH SÁCH GIỎ HÀNG --- */}
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            {/* --- PHẦN NÚT CHECKOUT --- */}
            <View style={styles.checkoutSection}>
                <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
                    <Text style={styles.checkoutText}>Go to Checkout</Text>
                    
                    <View style={styles.totalPriceBadge}>
                        <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* --- THANH BOTTOM NAVIGATION --- */}
            <View style={styles.bottomNav}>
                {/* Nút Shop (Sửa để điều hướng về Home) */}
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="storefront-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Shop</Text>
                </TouchableOpacity>

                {/* Nút Explore */}
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
                    <Ionicons name="search-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Explore</Text>
                </TouchableOpacity>

                {/* Nút Cart - Đang active (Màu xanh, icon đậm) */}
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="cart" size={24} color="#53B175" />
                    <Text style={[styles.navText, { color: '#53B175' }]}>Cart</Text>
                </TouchableOpacity>

                {/* Nút Favourite */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Favourite')}
                >
                    <Ionicons name="heart-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Favourite</Text>
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
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cartItemContainer: {
        flexDirection: 'row',
        paddingVertical: 25,
        alignItems: 'center',
    },
    imageContainer: {
        width: 80,
        height: 80,
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
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181725',
        flex: 1,
        marginRight: 10,
    },
    removeButton: {
        padding: 5,
    },
    productSize: {
        fontSize: 14,
        color: '#7C7C7C',
        marginBottom: 15,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181725',
        marginHorizontal: 15,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#181725',
    },
    separator: {
        height: 1,
        backgroundColor: '#E2E2E2',
    },
    checkoutSection: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
        backgroundColor: '#FFF',
    },
    checkoutButton: {
        backgroundColor: '#53B175',
        borderRadius: 19,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        position: 'relative',
    },
    checkoutText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFF',
    },
    totalPriceBadge: {
        position: 'relative',
        right: -20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    totalPriceText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
    },

    // --- CÁC STYLE CHO BOTTOM NAV ---
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
        paddingBottom: Platform.OS === 'ios' ? 25 : 15, // Tạo khoảng trống cho tai thỏ/home bar trên iOS
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
});

export default CartScreen;