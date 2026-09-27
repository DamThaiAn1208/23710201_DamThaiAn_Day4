// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Ba vùng độc lập: ảnh bìa cố định / thông tin cuộn / thanh thêm vào giỏ cố định.
import React from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Book } from "../data";

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
  cartCount,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
  cartCount: number;
}) {
  const { width, height } = useWindowDimensions();
  // Giới hạn ảnh theo cả hai chiều để vùng mô tả vẫn cuộn được trên màn hình thấp.
  const coverWidth = Math.min(width * 0.52, height * 0.27, 220);
  return (
    <View style={styles.screen}>
      <Pressable accessibilityRole="button" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Quay lại</Text>
      </Pressable>

      <View style={styles.coverArea}>
        <Image
          source={{ uri: book.cover }}
          accessibilityLabel={`Bìa sách ${book.title}`}
          style={[styles.cover, { width: coverWidth }]}
        />
      </View>
      {/* Chỉ tên, tác giả, giá và mô tả nằm trong vùng cuộn riêng. */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.descriptionHeading}>Giới thiệu sách</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: row, 2 đầu cách xa nhau, KHÔNG nằm trong ScrollView
          -> luôn đứng yên một chỗ dù nội dung mô tả dài bao nhiêu. */}
      <View style={styles.bottomBar}>
        <View style={styles.priceGroup}>
          <Text style={styles.bottomPrice}>{book.price.toLocaleString('vi-VN')} đ</Text>
          <Text accessibilityLiveRegion="polite" style={styles.cartNote}>Trong giỏ: {cartCount} cuốn</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: {
    color: "#4338CA",
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  cover: {
    alignSelf: "center", // căn giữa riêng ảnh, không phụ thuộc alignItems của cha
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width theo %
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },
  coverArea: { paddingVertical: 12, backgroundColor: '#F1F5F9', flexShrink: 0 },
  descriptionHeading: { marginTop: 20, fontSize: 16, fontWeight: '700', color: '#111827' },
  priceGroup: { flex: 1 },
  cartNote: { marginTop: 4, fontSize: 12, color: '#5B6B7F' },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  bottomBar: {
    flexShrink: 0,
    gap: 12,
    flexDirection: "row", // giá bên trái, nút bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
