import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        {/* Có thể thay thế bằng Image nếu bạn có ảnh .png riêng */}
        <Ionicons name="checkmark-circle-outline" size={120} color="#53B175" style={styles.icon} />
        
        <Text style={styles.title}>Order Accepted</Text>
        <Text style={styles.subtitle}>
          Your items has been placed and is on it's way to being processed
        </Text>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeText}>Back to home</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  icon: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 },
  bottomButtons: { width: '100%', marginBottom: 20 },
  trackBtn: { backgroundColor: '#53B175', paddingVertical: 20, borderRadius: 19, alignItems: 'center', marginBottom: 10 },
  trackText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  homeBtn: { paddingVertical: 15, alignItems: 'center' },
  homeText: { color: '#181725', fontSize: 18, fontWeight: '600' }
});

export default SuccessScreen;