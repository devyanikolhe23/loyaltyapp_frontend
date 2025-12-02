import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`; // ⚠️ Replace with your backend IP

export default function Header({ title, showBack }) {
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const fetchUnreadCount = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return;

      const res = await axios.get(`${BASE_URL}/api/notifications/unread-count/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUnreadCount(res.data.count || 0);
    } catch (error) {
      console.log("❌ Notification count fetch error:", error.response?.data || error.message);
    }
  };

  // ✅ Refresh count whenever header becomes visible
  useFocusEffect(
    React.useCallback(() => {
      fetchUnreadCount();
    }, [])
  );

  return (
    <View style={styles.header}>
      {/* Left Side Icon */}
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleDrawer} style={styles.iconBtn}>
          <Icon name="menu" size={24} color="#222" />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("NotificationSettingsScreen")}>
        <View>
          <Icon name="notifications-outline" size={28} color="#333" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f5f5f5",
    elevation: 2,
  },
  iconBtn: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
