// GIỜ 5 — Bài tập 2 (1 dòng trong màn Giỏ hàng)
// Kỹ thuật: row với 3 vùng tỉ lệ khác nhau — ảnh cố định, tên flex:1 (co giãn),
// số lượng+giá width cố định. Khác BookRowCard (Giờ 1): ở đây giá KHÔNG neo đáy
// cột, mà nằm ngang hàng với tên, bên phải cùng.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CartItem } from "../data";

export function CartLineItem({ item }: { item: CartItem }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.book.cover }} accessibilityLabel={`Bìa sách ${item.book.title}`} style={styles.thumb} />

      {/* flex:1 -> chiếm hết phần rộng còn lại sau ảnh, đẩy khối số lượng/giá
          sang tận bên phải dù tên sách ngắn hay dài. */}
      <Text style={styles.title} numberOfLines={3}>
        {item.book.title}
      </Text>

      <View style={styles.meta}>
        <Text style={styles.qty}>SL: {item.quantity}</Text>
        <Text style={styles.price}>{(item.book.price * item.quantity).toLocaleString('vi-VN')} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // ảnh - tên - số lượng/giá nằm cùng 1 hàng ngang
    alignItems: "center",
    gap: 10,
    paddingVertical: 18,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  thumb: {
    width: 52,
    height: 72, // ảnh cố định, không co giãn theo flex
    borderRadius: 6,
    backgroundColor: "#EEF2F7",
  },
  title: {
    minWidth: 0,
    flex: 1, // co giãn ăn hết phần dư -> khối bên phải luôn dính sát mép phải
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    gap: 6,
    width: 90, // width cố định, KHÔNG dùng flex -> luôn giữ đúng bề rộng dù list dài
    alignItems: "flex-end",
  },
  qty: {
    fontSize: 11,
    color: "#5B6B7F",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
