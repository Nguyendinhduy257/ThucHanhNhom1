import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckoutModal = ({ visible, onClose, totalAmount, onSuccess, onFail }) => {
  
  const handlePlaceOrder = () => {
    onClose(); // Đóng modal checkout
    const amount = parseFloat(totalAmount);
    
    // Nếu tổng tiền <= 50$ thì gọi hàm onSuccess, ngược lại gọi onFail
    if (amount <= 50) {
      onSuccess();
    } else {
      onFail();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Checkout</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#181725" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery</Text>
            <TouchableOpacity style={styles.rowRight}>
              <Text style={styles.rowValue}>Select Method</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Payment</Text>
            <TouchableOpacity style={styles.rowRight}>
              <Ionicons name="card-outline" size={20} color="#181725" style={{ marginRight: 10 }} />
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Promo Code</Text>
            <TouchableOpacity style={styles.rowRight}>
              <Text style={styles.rowValue}>Pick discount</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Total Cost</Text>
            <TouchableOpacity style={styles.rowRight}>
              <Text style={styles.rowValue}>${totalAmount}</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsBold}>Terms</Text> And{' '}
            <Text style={styles.termsBold}>Conditions</Text>.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 25, paddingBottom: 40, paddingTop: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  closeBtn: { padding: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  rowLabel: { fontSize: 18, color: '#7C7C7C', fontWeight: '600' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 16, color: '#181725', fontWeight: '600', marginRight: 10 },
  termsText: { fontSize: 14, color: '#7C7C7C', marginTop: 20, marginBottom: 30, lineHeight: 22 },
  termsBold: { color: '#181725', fontWeight: 'bold' },
  button: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 22, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default CheckoutModal;