import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import hàm xóa storage của bạn
import { removeUserToken } from './storageHelper'; 

const ProfileScreen = ({ navigation }) => {

    // 1. Đưa hàm xử lý Đăng xuất vào trong để gọi được 'navigation'
    const handleLogout = async () => {
        try {
            await removeUserToken(); // Xóa khỏi storage
            
            // Chuyển hướng về màn hình đăng nhập và xóa lịch sử màn hình
            // LƯU Ý: Đổi 'LoginFinal' thành đúng tên route bạn đã đặt trong file App.js
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginFinal' }], 
            });
        } catch (error) {
            console.log("Lỗi khi đăng xuất:", error);
        }
    };

    // Component cho từng dòng menu
    const MenuItem = ({ icon, label, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuLeft}>
                <Ionicons name={icon} size={24} color="#181725" />
                <Text style={styles.menuLabel}>{label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#181725" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* --- HEADER: Thông tin cá nhân --- */}
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/NguyenDinhDuy.png')} 
                        style={styles.avatar} 
                    />
                    <View style={styles.headerInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.userName}>Nguyễn Đình Duy</Text>
                            <TouchableOpacity>
                                <Ionicons name="pencil-outline" size={18} color="#53B175" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.userEmail}>Nguyendinhduy257@gmail.com</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                {/* --- MENU LIST --- */}
                <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => navigation.navigate("OrderScreen")} />
                <MenuItem icon="id-card-outline" label="My Details" onPress={() => {}} />
                <MenuItem icon="location-outline" label="Delivery Address" onPress={() => {}} />
                <MenuItem icon="card-outline" label="Payment Methods" onPress={() => {}} />
                <MenuItem icon="pricetag-outline" label="Promo Code" onPress={() => {}} />
                <MenuItem icon="notifications-outline" label="Notifications" onPress={() => {}} />
                <MenuItem icon="help-circle-outline" label="Help" onPress={() => {}} />
                <MenuItem icon="alert-circle-outline" label="About" onPress={() => {}} />

                {/* --- NÚT LOG OUT --- */}
                <View style={styles.logoutContainer}>
                    {/* 2. Gắn hàm handleLogout vào onPress */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#53B175" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* --- THANH BOTTOM NAVIGATION --- */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="storefront-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Shop</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
                    <Ionicons name="search-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Explore</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Favourite')}>
                    <Ionicons name="heart-outline" size={24} color="#181725" />
                    <Text style={styles.navText}>Favourite</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={24} color="#53B175" />
                    <Text style={[styles.navText, { color: '#53B175' }]}>Account</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 27,
        marginRight: 20,
    },
    headerInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#181725',
        marginRight: 8,
    },
    userEmail: {
        fontSize: 14,
        color: '#7C7C7C',
        marginTop: 4,
    },
    separator: {
        height: 1,
        backgroundColor: '#E2E2E2',
        marginHorizontal: 0,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#181725',
        marginLeft: 15,
    },
    logoutContainer: {
        padding: 20,
        marginTop: 20,
        marginBottom: 100, // Khoảng trống cho bottom nav
    },
    logoutButton: {
        backgroundColor: '#F2F3F2',
        height: 67,
        borderRadius: 19,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#53B175',
        marginLeft: 15,
    },
    // Styles cho Bottom Nav
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
});

export default ProfileScreen;