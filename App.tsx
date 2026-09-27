import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { TabBar, TabKey } from "./components/TabBar";
import { CartScreen } from "./screens/CartScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { HomeScreen } from "./screens/HomeScreen";

import { BOOKS, CART_ITEMS } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const [cartCount, setCartCount] = useState(0);

  const [showCart, setShowCart] = useState(false);

  const selectedBook =
    BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Khi bấm tab
  const handleTabPress = (tab: TabKey) => {
    setActiveTab(tab);

    // Khi chuyển tab thì đóng chi tiết sách
    setSelectedBookId(null);

    // Nếu chuyển khỏi giỏ hàng thì đóng modal
    if (tab !== "cart") {
      setShowCart(false);
    }
  };

  // Hiển thị nội dung theo tab
  const renderScreen = () => {
    // =========================
    // TRANG CHỦ
    // =========================
    if (activeTab === "home") {
      if (selectedBook) {
        return (
          <BookDetailScreen
            book={selectedBook}
            cartCount={cartCount}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => setCartCount((n) => n + 1)}
          />
        );
      }

      return (
        <HomeScreen
          cartCount={cartCount}
          onPressBook={(id) => setSelectedBookId(id)}
          onPressCart={() => setActiveTab("cart")}
        />
      );
    }

    // =========================
    // DANH MỤC
    // =========================
    if (activeTab === "category") {
      return (
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Danh mục</Text>

          <Text style={styles.pageText}>
            Đây là trang Danh mục.
          </Text>

          <Text style={styles.pageText}>
            Bạn có thể thêm danh sách thể loại sách ở đây.
          </Text>
        </View>
      );
    }

    // =========================
    // GIỎ HÀNG
    // =========================
    if (activeTab === "cart") {
      return (
        <View style={{ flex: 1 }}>
          <CartScreen items={CART_ITEMS} />
        </View>
      );
    }

    // =========================
    // TÀI KHOẢN
    // =========================
    if (activeTab === "account") {
      return (
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Tài khoản</Text>

          <Text style={styles.pageText}>
            Đây là trang Tài khoản.
          </Text>

          <Text style={styles.pageText}>
            Bạn có thể thêm thông tin người dùng ở đây.
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        {/* Nội dung trang */}
        <View style={styles.body}>
          {renderScreen()}
        </View>

        {/* Modal giỏ hàng */}
        <Modal
          visible={showCart}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCart(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.dialog}>
              <Text style={styles.dialogTitle}>
                Giỏ hàng của bạn
              </Text>

              <Text>
                {cartCount === 0
                  ? "Chưa có sách trong giỏ. Chọn một cuốn sách để xem chi tiết."
                  : `Bạn đã thêm ${cartCount} cuốn sách vào giỏ.`}
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => setShowCart(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>
                  Tiếp tục xem sách
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Tab Bar */}
        <TabBar
          active={activeTab}
          onPress={handleTabPress}
        />

        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  body: {
    flex: 1,
  },

  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E1B4B",
    marginBottom: 12,
  },

  pageText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 8,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(15,23,42,0.45)",
  },

  dialog: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    padding: 24,
    gap: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  dialogTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1B4B",
  },

  closeButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#4338CA",
    alignItems: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
