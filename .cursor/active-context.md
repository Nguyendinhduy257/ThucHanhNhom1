> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `screens\OrderScreen.js` (Domain: **Frontend (React/UI)**)

### 📐 Frontend (React/UI) Conventions & Fixes
- **[what-changed] 🟢 Edited screens/OrderScreen.js (23 changes, 2min)**: Active editing session on screens/OrderScreen.js.
23 content changes over 2 minutes.
- **[what-changed] what-changed in OrderScreen.js**: -                     <Ionicons name="chevron-back" size={28} color="#181725" />
+                     <Ionicons name="home" size={28} color="#181725" />

📌 IDE AST Context: Modified symbols likely include [OrderScreen, styles, default]
- **[what-changed] what-changed in OrderScreen.js**: -             
+ 
-     <Ionicons name="chevron-back" size={28} color="#181725" />
+                     <Ionicons name="chevron-back" size={28} color="#181725" />
- </TouchableOpacity>
+                 </TouchableOpacity>

📌 IDE AST Context: Modified symbols likely include [OrderScreen, styles, default]
- **[what-changed] Refactored TouchableOpacity logic — improves module reusability**: -                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
+                 <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backBtn}>
-                     <Ionicons name="chevron-back" size={28} color="#181725" />
+     <Ionicons name="chevron-back" size={28} color="#181725" />
-                 </TouchableOpacity>
+ </TouchableOpacity>
-                 <Text style={styles.headerTitle}>Order History</Text>
+ 
-                 <View style={{ width: 28 }} />
+                 <Text style={styles.headerTitle}>Order History</Text>
-             </View>
+                 <View style={{ width: 28 }} />
- 
+             </View>
-             {orders.length === 0 ? (
+ 
-                 <View style={styles.emptyContainer}>
+             {orders.length === 0 ? (
-                     <Ionicons name="receipt-outline" size={64} color="#B3B3B3" />
+                 <View style={styles.emptyContainer}>
-                     <Text style={styles.emptyText}>Chưa có đơn hàng nào.</Text>
+                     <Ionicons name="receipt-outline" size={64} color="#B3B3B3" />
-                 </View>
+                     <Text style={styles.emptyText}>Chưa có đơn hàng nào.</Text>
-             ) : (
+                 </View>
-                 <FlatList
+             ) : (
-                     data={orders}
+                 <FlatList
-                     renderItem={renderOrderItem}
+                     data={orders}
-                     keyExtractor={item => item.id}
+                     renderItem={renderOrderItem}
-                     contentContainerStyle={styles.listContent}
+                     keyExtractor={item => item.id}
-                 />
+                     contentContainerStyle={styles.listContent}
-             )}
+                 />
-         </SafeAreaView>
+             )}
-     );
+         </SafeAreaView>
- };
+     );
- 
+ };
- const styles
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [OrderScreen, styles, default]
- **[what-changed] 🟢 Edited screens/ProfileScreen.js (8 changes, 1min)**: Active editing session on screens/ProfileScreen.js.
8 content changes over 1 minutes.
- **[what-changed] what-changed in ProfileScreen.js**: -                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => navigation} />
+                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => navigation.navigate("OrderScreen")} />

📌 IDE AST Context: Modified symbols likely include [ProfileScreen, styles, default]
- **[what-changed] what-changed in ProfileScreen.js**: -                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => } />
+                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => navigation} />

📌 IDE AST Context: Modified symbols likely include [ProfileScreen, styles, default]
- **[what-changed] what-changed in ProfileScreen.js**: -                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => {}} />
+                 <MenuItem icon="bag-handle-outline" label="Orders" onPress={() => } />

📌 IDE AST Context: Modified symbols likely include [ProfileScreen, styles, default]
- **[what-changed] 🟢 Edited screens/SuccessScreen.js (35 changes, 1min)**: Active editing session on screens/SuccessScreen.js.
35 content changes over 1 minutes.
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('Order')}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('OrderScreen')}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate()}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('Order')}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate{}}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate()}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navig{}}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate{}}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.na{}}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navig{}}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
- **[what-changed] what-changed in SuccessScreen.js**: -         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.{}}>
+         <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.na{}}>

📌 IDE AST Context: Modified symbols likely include [SuccessScreen, styles, default]
