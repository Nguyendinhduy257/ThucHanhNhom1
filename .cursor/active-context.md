> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `screens\HomeScreen.js` (Domain: **Frontend (React/UI)**)

### 📐 Frontend (React/UI) Conventions & Fixes
- **[what-changed] 🟢 Edited screens/HomeScreen.js (14 changes, 3min)**: Active editing session on screens/HomeScreen.js.
14 content changes over 3 minutes.
- **[convention] what-changed in HomeScreen.js — confirmed 8x**: -   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
+   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[problem-fix] Fixed null crash in Name — improves module reusability**: -   const isFavorite = favourites.some(item => item.id === product.id || item.title === product.title);
+  // Đảm bảo chỉ báo đỏ (isFavorite = true) khi ID hoặc Name thực sự khớp và TỒN TẠI
- 
+   const isFavorite = favourites.some(item => 
-   // 3. TÍNH TOÁN GIÁ (Nằm trong Component để truy cập được biến 'product')
+     (item.id && product.id && item.id === product.id) || 
-   const basePrice = parseFloat(product.price) || 0;
+     (item.name && product.name && item.name === product.name) ||
-   const totalPrice = (basePrice * quantity).toFixed(2);
+     (item.title && product.title && item.title === product.title)
- 
+   );
-   // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG ---
+ 
-   const handleAddToBasket = () => {
+   // 3. TÍNH TOÁN GIÁ (Nằm trong Component để truy cập được biến 'product')
-     Alert.alert(
+   const basePrice = parseFloat(product.price) || 0;
-       "Giỏ hàng",
+   const totalPrice = (basePrice * quantity).toFixed(2);
-       `Đã thêm ${quantity} x ${product.title || 'Sản phẩm'} vào giỏ hàng!\nTổng thanh toán: $${totalPrice}`,
+ 
-       [{ text: "OK", style: "cancel" }]
+   // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG ---
-     );
+   const handleAddToBasket = () => {
-   };
+     Alert.alert(
- 
+       "Giỏ hàng",
-   // Nếu không có sản phẩm (bị lỗi truyền tham số), hiển thị thông báo an toàn
+       `Đã thêm ${quantity} x ${product.title || 'Sản phẩm'} vào giỏ hàng!\nTổng thanh toán: $${totalPrice}`,
-   if (!product.title && !product.name) {
+       [{ text: "OK", style: "cancel" }]
-     return (
+     );
-       <SafeAreaView style={styles.container}>
+   };
-         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
+ 
-           <Text>Không tìm thấy thông tin sản phẩm.</Text>
+   // Nếu không có sản phẩm (bị lỗi truyền tham số), hiển thị thông báo an toàn
-           <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
+   if (!product.title && !product.
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [ProductDetailScreen, styles, default]
- **[problem-fix] Fixed null crash in NGAY**: -     setFavourites((prevFavourites) => {
+     // 1. CHẶN NGAY NẾU DỮ LIỆU RỖNG
-       // 1. Tạo một mã định danh duy nhất cho sản phẩm đang xét
+     if (!product) return;
-       // Nếu không có id, title hay name, thì gán tạm một chuỗi ngẫu nhiên để không bị trùng
+ 
-       const currentProductId = product.id || product.title || product.name || Date.now().toString();
+     // 2. Lấy ID chuẩn (ưu tiên id, nếu không có id thì dùng name hoặc title)
- 
+     const productId = product.id || product.name || product.title;
-       // 2. Kiểm tra xem sản phẩm này đã tồn tại trong mảng chưa
+ 
-       const isExist = prevFavourites.find((item) => {
+     // Báo lỗi ra console nếu sản phẩm này hoàn toàn không có ID hay Tên (Giúp bạn dễ debug)
-         const itemId = item.id || item.title || item.name;
+     if (!productId) {
-         return itemId === currentProductId;
+       console.log("LỖI: Sản phẩm này không có id, name hay title để lưu!", product);
-       });
+       return; 
-       
+     }
-       if (isExist) {
+ 
-         // NẾU ĐÃ CÓ: Xóa sản phẩm đó khỏi mảng (Bỏ tim)
+     setFavourites((prevFavourites) => {
-         return prevFavourites.filter((item) => {
+       // 3. So sánh cực kỳ chặt chẽ
-           const itemId = item.id || item.title || item.name;
+       const isExist = prevFavourites.some(item => 
-           return itemId !== currentProductId;
+         (item.id && item.id === product.id) || 
-         });
+         (item.name && item.name === product.name) ||
-       } else {
+         (item.title && item.title === product.title)
-         // NẾU CHƯA CÓ: Thêm sản phẩm mới vào CUỐI mảng cũ (Giữ nguyên các món đã tim)
+       );
-         // Lưu ý: Đảm bảo sản phẩm mới được cấp 1 id nếu nó chưa có
+       
-         const newProduct = { ...product, _internalId: currentProductId };
+       if (isExist) {
-         return [...prevFavourites, newProduct];
+         // GỠ TIM: Lọc bỏ sản phẩm trùng kh
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FavouriteContext, FavouriteProvider]
- **[what-changed] Refactored Text logic — improves module reusability**: -       </View>
+         <Text style={{color: 'red'}}>Tổng số món đang tim: {favourites.length}</Text>
- 
+       </View>
-       {/* --- DANH SÁCH YÊU THÍCH HOẶC THÔNG BÁO TRỐNG --- */}
+ 
-       {favourites.length === 0 ? (
+       {/* --- DANH SÁCH YÊU THÍCH HOẶC THÔNG BÁO TRỐNG --- */}
-         <View style={styles.emptyContainer}>
+       {favourites.length === 0 ? (
-           <Ionicons name="heart-dislike-outline" size={80} color="#E2E2E2" />
+         <View style={styles.emptyContainer}>
-           <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
+           <Ionicons name="heart-dislike-outline" size={80} color="#E2E2E2" />
-         </View>
+           <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
-       ) : (
+         </View>
-         <FlatList
+       ) : (
-           data={favourites}
+         <FlatList
-           renderItem={renderFavouriteItem}
+           data={favourites}
-           keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
+           renderItem={renderFavouriteItem}
-           showsVerticalScrollIndicator={false}
+           keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
-           contentContainerStyle={styles.listContent}
+           showsVerticalScrollIndicator={false}
-           ItemSeparatorComponent={() => <View style={styles.separator} />}
+           contentContainerStyle={styles.listContent}
-         />
+           ItemSeparatorComponent={() => <View style={styles.separator} />}
-       )}
+         />
- 
+       )}
-       {/* --- NÚT ADD ALL TO CART --- */}
+ 
-       <View style={styles.actionSection}>
+       {/* --- NÚT ADD ALL TO CART --- */}
-         <TouchableOpacity style={styles.addAllButton} activeOpacity={0.8}>
+       <View style={styles.actionSection}>
-           <Text style={styles.addAllText}>Add All To Cart</Text>
+         <TouchableOpacity style={
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FavouriteScreen, styles, default]
- **[what-changed] 🟢 Edited screens/FavouriteContext.js (27 changes, 8min)**: Active editing session on screens/FavouriteContext.js.
27 content changes over 8 minutes.
- **[what-changed] what-changed in FavouriteContext.js**: - // Tạo Context
+ export const FavouriteContext = createContext();
- export const FavouriteContext = createContext();
+ 
- 
+ export const FavouriteProvider = ({ children }) => {
- export const FavouriteProvider = ({ children }) => {
+   const [favourites, setFavourites] = useState([]);
-   // Khởi tạo state là một MẢNG RỖNG [] để chứa nhiều sản phẩm
+ 
-   const [favourites, setFavourites] = useState([]);
+   const toggleFavourite = (product) => {
- 
+     setFavourites((prevFavourites) => {
-   // Hàm xử lý thả tim / bỏ tim
+       // 1. Tạo một mã định danh duy nhất cho sản phẩm đang xét
-   const toggleFavourite = (product) => {
+       // Nếu không có id, title hay name, thì gán tạm một chuỗi ngẫu nhiên để không bị trùng
-     setFavourites((prevFavourites) => {
+       const currentProductId = product.id || product.title || product.name || Date.now().toString();
-       // 1. Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
+ 
-       // Cố gắng check qua id, hoặc name, hoặc title để đảm bảo nhận diện đúng
+       // 2. Kiểm tra xem sản phẩm này đã tồn tại trong mảng chưa
-       const isExist = prevFavourites.find(
+       const isExist = prevFavourites.find((item) => {
-         (item) => 
+         const itemId = item.id || item.title || item.name;
-           (item.id && item.id === product.id) || 
+         return itemId === currentProductId;
-           (item.title && item.title === product.title) || 
+       });
-           (item.name && item.name === product.name)
+       
-       );
+       if (isExist) {
-       
+         // NẾU ĐÃ CÓ: Xóa sản phẩm đó khỏi mảng (Bỏ tim)
-       if (isExist) {
+         return prevFavourites.filter((item) => {
-         // 2. Nếu ĐÃ CÓ (nghĩa là user muốn BỎ TIM) -> Lọc bỏ sản phẩm đó ra khỏi mảng
+           const itemId = item.id || item.title || item.name;
-         return prevFavourites.filter(
+           return itemId !== currentProductId;
-           (item
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FavouriteContext, FavouriteProvider]
- **[convention] what-changed in FavouriteContext.js — confirmed 3x**: -         // CÚ PHÁP [...prevFavourites, product] RẤT QUAN TRỌNG: 
+         // CÚ PHÁP [...prevFavourites, product] có tác dụng: 

📌 IDE AST Context: Modified symbols likely include [FavouriteContext, FavouriteProvider]
- **[convention] 🟢 Edited screens/FavouriteScreen.js (28 changes, 5min) — confirmed 3x**: Active editing session on screens/FavouriteScreen.js.
28 content changes over 5 minutes.
- **[convention] what-changed in FavouriteScreen.js — confirmed 3x**: - import{}
+ import {}

📌 IDE AST Context: Modified symbols likely include [FavouriteScreen, styles, default]
- **[problem-fix] Fixed null crash in React — improves module reusability**: - import React from 'react';
+ import React, { useContext } from 'react';
- import { FavouriteContext } from './FavouriteContext';
+ 
- 
+ // --- IMPORT CONTEXT ---
- // --- DỮ LIỆU MẪU YÊU THÍCH ---
+ // LƯU Ý: Đổi '../path/to/FavouriteContext' thành đường dẫn thực tế file của bạn
- const favouriteData = [
+ import { FavouriteContext } from '../context/FavouriteContext'; 
-   { 
+ 
-     id: '1', 
+ const FavouriteScreen = ({ navigation }) => {
-     name: 'Sprite Can', 
+   // Lấy danh sách yêu thích từ Context thay vì dùng dữ liệu cứng
-     size: '325ml, Price', 
+   const { favourites } = useContext(FavouriteContext);
-     price: 1.50, 
+ 
-     image: require('../assets/sprite.png') // Thay bằng ảnh thực tế của bạn
+   // --- COMPONENT: Từng Item Yêu Thích ---
-   },
+   const renderFavouriteItem = ({ item }) => {
-   { 
+     // Xử lý linh hoạt các trường hợp tên biến (tùy thuộc vào product object của bạn)
-     id: '2', 
+     const title = item.title || item.name || 'Sản phẩm';
-     name: 'Diet Coke', 
+     const subTitle = item.subTitle || item.size || 'Kích thước';
-     size: '355ml, Price', 
+     const price = parseFloat(item.price) || 0;
-     price: 1.99, 
+     const imageSource = item.imagePath || item.image;
-     image: require('../assets/Coke1.png') 
+ 
-   },
+     return (
-   { 
+       <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
-     id: '3', 
+         {/* Cột Trái: Ảnh */}
-     name: 'Apple & Grape Juice', 
+         <View style={styles.imageContainer}>
-     size: '2L, Price', 
+           <Image source={imageSource} style={styles.productImage} resizeMode="contain" />
-     price: 15.50, 
+         </View>
-     image: require('../assets/appleJuice.png') 
+ 
-   },
+         {/* Cột Giữa: Thông tin */}
-   { 
+         <View style={styles.infoContainer}>
-     id: '4', 
+           <Text style={styles.productName}>{title}</Text>
-     name: 'Coca Cola Can
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [FavouriteScreen, styles, default]
- **[what-changed] Refactored Sprite logic — improves module reusability**: - 
+ import {}
- // --- DỮ LIỆU MẪU YÊU THÍCH ---
+ 
- const favouriteData = [
+ // --- DỮ LIỆU MẪU YÊU THÍCH ---
-   { 
+ const favouriteData = [
-     id: '1', 
+   { 
-     name: 'Sprite Can', 
+     id: '1', 
-     size: '325ml, Price', 
+     name: 'Sprite Can', 
-     price: 1.50, 
+     size: '325ml, Price', 
-     image: require('../assets/sprite.png') // Thay bằng ảnh thực tế của bạn
+     price: 1.50, 
-   },
+     image: require('../assets/sprite.png') // Thay bằng ảnh thực tế của bạn
-   { 
+   },
-     id: '2', 
+   { 
-     name: 'Diet Coke', 
+     id: '2', 
-     size: '355ml, Price', 
+     name: 'Diet Coke', 
-     price: 1.99, 
+     size: '355ml, Price', 
-     image: require('../assets/Coke1.png') 
+     price: 1.99, 
-   },
+     image: require('../assets/Coke1.png') 
-   { 
+   },
-     id: '3', 
+   { 
-     name: 'Apple & Grape Juice', 
+     id: '3', 
-     size: '2L, Price', 
+     name: 'Apple & Grape Juice', 
-     price: 15.50, 
+     size: '2L, Price', 
-     image: require('../assets/appleJuice.png') 
+     price: 15.50, 
-   },
+     image: require('../assets/appleJuice.png') 
-   { 
+   },
-     id: '4', 
+   { 
-     name: 'Coca Cola Can', 
+     id: '4', 
-     size: '325ml, Price', 
+     name: 'Coca Cola Can', 
-     price: 4.99, 
+     size: '325ml, Price', 
-     image: require('../assets/CocacolaCan.png') 
+     price: 4.99, 
-   },
+     image: require('../assets/CocacolaCan.png') 
-   { 
+   },
-     id: '5', 
+   { 
-     name: 'Pepsi Can', 
+     id: '5', 
-     size: '330ml, Price', 
+     name: 'Pepsi Can', 
-     price: 4.99, 
+     size: '330ml, Price', 
-     image: require('../assets/pepsiCan.png') 
+     price: 4.99, 
-   },
+     image: require('../assets/pepsiCan.png') 
- ];
+   },
- 
+ ];
- const FavouriteScreen = ({ navigation }) => {
+ 
- 
+ const FavouriteScreen = ({ navigation }) => {
-   // --- COMPONENT: Từng Item Yêu Thích
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [favouriteData, FavouriteScreen, styles, default]
- **[what-changed] 🟢 Edited screens/ProductDetailScreen.js (51 changes, 2min)**: Active editing session on screens/ProductDetailScreen.js.
51 content changes over 2 minutes.
- **[what-changed] Replaced react with react**: - import React, { useState, useContext} from 'react';
+ import React, { useState, useContext } from 'react';
- import { 
+ import {
-   View, 
+   View,
-   Text, 
+   Text,
-   StyleSheet, 
+   StyleSheet,
-   Image, 
+   Image,
-   TouchableOpacity, 
+   TouchableOpacity,
-   SafeAreaView, 
+   SafeAreaView,
-         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
+         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
-           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20}}>
+           <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
-             <Text style={{color: '#53B175'}}>Quay lại</Text>
+             <Text style={{ color: '#53B175' }}>Quay lại</Text>
-         
+ 
-           <Image 
+           <Image
-             source={product.imagePath || product.image} 
+             source={product.imagePath || product.image}
-             style={styles.productImage} 
+             style={styles.productImage}
-             resizeMode="contain" 
+             resizeMode="contain"
-           <Ionicons 
+               <Ionicons
-             name={isFavorite ? "heart" : "heart-outline"} 
+                 name={isFavorite ? "heart" : "heart-outline"}
-             size={28} 
+                 size={28}
-             color={isFavorite ? "#FF4B4B" : "#7C7C7C"} 
+                 color={isFavorite ? "#FF4B4B" : "#7C7C7C"}
-           />
+               />
-         </TouchableOpacity>
+             </TouchableOpacity>
-             
+ 

📌 IDE AST Context: Modified symbols likely include [ProductDetailScreen, styles, default]
- **[convention] what-changed in ProductDetailScreen.js — confirmed 3x**: -             <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
+             <TouchableOpacity onPress={() => toggleFavourite(product)}>
-               <Ionicons 
+           <Ionicons 
-                 name={isFavorite ? "heart" : "heart-outline"} 
+             name={isFavorite ? "heart" : "heart-outline"} 
-                 size={28} 
+             size={28} 
-                 color={isFavorite ? "#FF4B4B" : "#7C7C7C"} 
+             color={isFavorite ? "#FF4B4B" : "#7C7C7C"} 
-               />
+           />
-             </TouchableOpacity>
+         </TouchableOpacity>

📌 IDE AST Context: Modified symbols likely include [ProductDetailScreen, styles, default]
