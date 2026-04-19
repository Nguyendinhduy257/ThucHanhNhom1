> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `screens\HomeScreen.js` (Domain: **Frontend (React/UI)**)

### 📐 Frontend (React/UI) Conventions & Fixes
- **[what-changed] Replaced dependency IMPORT — improves module reusability**: - // --- CẤU HÌNH RESPONSIVE ---
+ // IMPORT DỮ LIỆU TỪ FILE DATA
- const { width, height } = Dimensions.get('window');
+ import { productsData } from '../data';
- const SCREEN_MARGIN = 25; 
+ 
- const CARD_WIDTH = width * 0.43; 
+ // --- CẤU HÌNH RESPONSIVE ---
- 
+ const { width, height } = Dimensions.get('window');
- // --- COMPONENT CON: Thẻ Sản Phẩm ---
+ const SCREEN_MARGIN = 25; 
- const ProductCard = ({ product, navigation }) => (
+ const CARD_WIDTH = width * 0.43; 
-   <View style={styles.cardContainer}>
+ 
-     <TouchableOpacity 
+ // --- COMPONENT CON: Thẻ Sản Phẩm ---
-       onPress={() => navigation.navigate('ProductDetail', { product })}
+ const ProductCard = ({ product, navigation }) => (
-       style={styles.imageWrapper}
+   <View style={styles.cardContainer}>
-     >
+     <TouchableOpacity 
-       <Image source={product.imagePath} style={styles.cardImage} resizeMode="contain" />
+       onPress={() => navigation.navigate('ProductDetail', { product })}
-     </TouchableOpacity>
+       style={styles.imageWrapper}
-     
+     >
-     <View>
+       <Image source={product.imagePath} style={styles.cardImage} resizeMode="contain" />
-       <Text style={styles.cardTitle} numberOfLines={1}>{product.title}</Text>
+     </TouchableOpacity>
-       <Text style={styles.cardSubtitle} numberOfLines={1}>{product.subTitle}</Text>
+     
-     </View>
+     <View>
-     
+       <Text style={styles.cardTitle} numberOfLines={1}>{product.title}</Text>
-     <View style={styles.cardFooter}>
+       <Text style={styles.cardSubtitle} numberOfLines={1}>{product.subTitle}</Text>
-       <Text style={styles.cardPrice}>${product.price}</Text>
+     </View>
-       <TouchableOpacity 
+     
-         style={styles.addButton}
+     <View style={styles.cardFooter}>
-         activeOpacity={0.8}
+       <Text style={styles.cardPrice}>${product.price}</Text>
-         onPress={() => navigation.navigate('ProductDetail', { 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[what-changed] 🟢 Edited screens/HomeScreen.js (178 changes, 17min)**: Active editing session on screens/HomeScreen.js.
178 content changes over 17 minutes.
- **[what-changed] 🟢 Edited screens/HomeScreen.js (333 changes, 11min)**: Active editing session on screens/HomeScreen.js.
333 content changes over 11 minutes.
- **[convention] Replaced dependency DairyAndEgg — confirmed 13x**: -             product={{ id: 'ex_2', imagePath: require('../assets/DairyAndEgg.png'), title: "Milk Cheese", subTitle: "1kg, Priceg", price: "21.99" }} 
+             product={{ id: 'ex_6', imagePath: require('../assets/DairyAndEgg.png'), title: "Milk Cheese", subTitle: "1kg, Priceg", price: "21.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency Noodle — confirmed 3x**: -             product={{ id: 'ex_2', imagePath: require('../assets/eggnoodle1.png'), title: "Egg Noodle", subTitle: "1kg, Priceg", price: "12.99" }} 
+             product={{ id: 'ex_5', imagePath: require('../assets/eggnoodle1.png'), title: "Egg Noodle", subTitle: "1kg, Priceg", price: "12.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency Pastal — confirmed 3x**: -             product={{ id: 'ex_2', imagePath: require('../assets/eggPasta.png'), title: "Egg Pastal", subTitle: "1kg, Priceg", price: "8.99" }} 
+             product={{ id: 'ex_4', imagePath: require('../assets/eggPasta.png'), title: "Egg Pastal", subTitle: "1kg, Priceg", price: "8.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency Sprite — confirmed 5x**: -             product={{ id: 'bs_2', imagePath: require('../assets/sprite.png'), title: "Sprite", subTitle: "250ml, Priceg", price: "17.99" }} 
+             product={{ id: 'bs_5', imagePath: require('../assets/sprite.png'), title: "Sprite", subTitle: "250ml, Priceg", price: "17.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency White — confirmed 5x**: -             product={{ id: 'bs_2', imagePath: require('../assets/EggsV1.png'), title: "White Egg", subTitle: "350gm, Priceg", price: "9.99" }} 
+             product={{ id: 'bs_4', imagePath: require('../assets/EggsV1.png'), title: "White Egg", subTitle: "350gm, Priceg", price: "9.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency AnhThitGa — confirmed 3x**: -             product={{ id: 'meat_2', imagePath: require('../assets/AnhThitGa.png'), title: "Broiler Chicken", subTitle: "1kg, Priceg", price: "24.99" }} 
+             product={{ id: 'meat_4', imagePath: require('../assets/AnhThitGa.png'), title: "Broiler Chicken", subTitle: "1kg, Priceg", price: "24.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency AnhMiengThit — confirmed 5x**: -             product={{ id: 'meat_1', imagePath: require('../assets/AnhMiengThit.png'), title: "Beef Bone", subTitle: "1kg, Priceg", price: "9.99" }} 
+             product={{ id: 'meat_3', imagePath: require('../assets/AnhMiengThit.png'), title: "Beef Bone", subTitle: "1kg, Priceg", price: "9.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[what-changed] what-changed in HomeScreen.js**: -         </ScrollView>
+                     <ProductCard 
-       </ScrollView>
+             navigation={navigation} 
- 
+             product={{ id: 'meat_2', imagePath: require('../assets/AnhThitGa.png'), title: "Broiler Chicken", subTitle: "1kg, Priceg", price: "4.99" }} 
-       {/* Bottom Navigation với Highlight và khoảng cách an toàn */}
+           />
-       <View style={styles.navContainer}>
+         </ScrollView>
-         <View style={styles.bottomNav}>
+       </ScrollView>
-             {[
+ 
-                 { name: 'Shop', icon: 'storefront', screen: 'Home' },
+       {/* Bottom Navigation với Highlight và khoảng cách an toàn */}
-                 { name: 'Explore', icon: 'search', screen: 'Explore' },
+       <View style={styles.navContainer}>
-                 { name: 'Cart', icon: 'cart', screen: 'Cart' },
+         <View style={styles.bottomNav}>
-                 { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
+             {[
-                 { name: 'Account', icon: 'person', screen: 'Account' }
+                 { name: 'Shop', icon: 'storefront', screen: 'Home' },
-             ].map((tab) => {
+                 { name: 'Explore', icon: 'search', screen: 'Explore' },
-                 const isActive = activeTab === tab.name;
+                 { name: 'Cart', icon: 'cart', screen: 'Cart' },
-                 return (
+                 { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
-                     <TouchableOpacity 
+                 { name: 'Account', icon: 'person', screen: 'Account' }
-                         key={tab.name}
+             ].map((tab) => {
-                         style={styles.navItem} 
+                 const isActive = activeTab === tab.name;
-                         onPress={() => {
+                 return (
-                             setActiveTab(tab.name);
+                     <TouchableOpacity 
-                             if(tab.screen
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[what-changed] what-changed in HomeScreen.js**: -         </ScrollView>
+                     <ProductCard 
-       </ScrollView>
+             navigation={navigation} 
- 
+             product={{ id: 'meat_1', imagePath: require('../assets/AnhMiengThit.png'), title: "Beef Bone", subTitle: "1kg, Priceg", price: "4.99" }} 
-       {/* Bottom Navigation với Highlight và khoảng cách an toàn */}
+           />
-       <View style={styles.navContainer}>
+         </ScrollView>
-         <View style={styles.bottomNav}>
+       </ScrollView>
-             {[
+ 
-                 { name: 'Shop', icon: 'storefront', screen: 'Home' },
+       {/* Bottom Navigation với Highlight và khoảng cách an toàn */}
-                 { name: 'Explore', icon: 'search', screen: 'Explore' },
+       <View style={styles.navContainer}>
-                 { name: 'Cart', icon: 'cart', screen: 'Cart' },
+         <View style={styles.bottomNav}>
-                 { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
+             {[
-                 { name: 'Account', icon: 'person', screen: 'Account' }
+                 { name: 'Shop', icon: 'storefront', screen: 'Home' },
-             ].map((tab) => {
+                 { name: 'Explore', icon: 'search', screen: 'Explore' },
-                 const isActive = activeTab === tab.name;
+                 { name: 'Cart', icon: 'cart', screen: 'Cart' },
-                 return (
+                 { name: 'Favourite', icon: 'heart', screen: 'Favourite' },
-                     <TouchableOpacity 
+                 { name: 'Account', icon: 'person', screen: 'Account' }
-                         key={tab.name}
+             ].map((tab) => {
-                         style={styles.navItem} 
+                 const isActive = activeTab === tab.name;
-                         onPress={() => {
+                 return (
-                             setActiveTab(tab.name);
+                     <TouchableOpacity 
-                             if(tab.screen !=
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency Diet — confirmed 4x**: -             product={{ id: 'bs_2', imagePath: require('../assets/Coke1.png'), title: "Diet Coke", subTitle: "250gm, Priceg", price: "4.99" }} 
+             product={{ id: 'bs_2', imagePath: require('../assets/Coke1.png'), title: "Diet Coke", subTitle: "250gm, Priceg", price: "1.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[what-changed] Replaced dependency Priceg**: -             product={{ id: 'bs_2', imagePath: require('../assets/sprite.png'), title: "Ginger", subTitle: "250gm, Priceg", price: "4.99" }} 
+             product={{ id: 'bs_2', imagePath: require('../assets/sprite.png'), title: "Spi", subTitle: "250gm, Priceg", price: "4.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
- **[convention] Replaced dependency Ginger — confirmed 5x**: -             product={{ id: 'bs_2', imagePath: require('../assets/AnhCuGung.png'), title: "Ginger", subTitle: "250gm, Priceg", price: "4.99" }} 
+             product={{ id: 'bs_2', imagePath: require('../assets/sprite.png'), title: "Ginger", subTitle: "250gm, Priceg", price: "4.99" }} 

📌 IDE AST Context: Modified symbols likely include [width, height, SCREEN_MARGIN, CARD_WIDTH, ProductCard]
