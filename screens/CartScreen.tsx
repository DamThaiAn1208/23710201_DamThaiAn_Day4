// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng
// Đủ 3 vùng theo yêu cầu: nội dung cuộn (danh sách) + thanh tổng tiền cố định
// (không cuộn) + TabBar cố định (vẽ ở App.tsx, không vùng nào chồng lấp vùng nào.
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { CartLineItem } from "../components/CartLineItem";
import { CartItem } from "../data";

export function CartScreen({ items }: { items: CartItem[] }) {
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Giỏ hàng</Text>

      {/* Danh sách sản phẩm: CUỘN được (flex:1), nằm GIỮA header và thanh tổng tiền */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <CartLineItem key={item.book.id} item={item} />
        ))}
      </ScrollView>

      {/* Thanh tổng tiền + nút thanh toán: KHÔNG cuộn, đứng cố định ngay trên
          TabBar (TabBar vẽ riêng ở App.tsx, cả 2 cùng "cố định" nhưng độc lập). */}
      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{total.toLocaleString('vi-VN')} đ</Text>
        </View>
        {/* Nút minh hoạ layout tĩnh theo đề, chưa xử lý thanh toán. */}
        <View style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16 },
  totalBar: {
    flexShrink: 0,
    gap: 12,
    flexDirection: "row", // tổng tiền bên trái, nút thanh toán bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    // TabBar là phần tử kế tiếp trong luồng flex nên không cần marginBottom.
  },
  totalLabel: { fontSize: 12, color: "#5B6B7F" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#1E1B4B" },
  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: { color: "#FFFFFF", fontWeight: "700" },
});
