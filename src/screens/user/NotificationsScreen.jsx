import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "../../components/Header";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

export default function NotificationSettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return;

      const res = await axios.get(`${BASE_URL}/api/notifications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("📩 Notifications from API:", res.data);
      setNotifications(res.data);
    } catch (err) {
      console.log("❌ Notification fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Mark notification as read
  const markAsRead = async (id) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return;

      await axios.post(`${BASE_URL}/api/notifications/mark-read/${id}/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI locally after marking
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );
    } catch (err) {
      console.log("❌ Mark as read error:", err.response?.data || err.message);
    }
  };

  // ✅ Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ Loader state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading notifications...</Text>
      </View>
    );
  }

  // ✅ Empty state
  if (notifications.length === 0) {
    return (
      <View style={styles.center}>
        <Icon name="notifications-off-outline" size={60} color="#888" />
        <Text style={{ fontSize: 16, color: "#555", marginTop: 10 }}>No notifications yet</Text>
      </View>
    );
  }

  // ✅ Render each notification item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.is_read && styles.readNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={item.is_read ? "notifications-outline" : "notifications"}
          size={26}
          color={item.is_read ? "#999" : "#007AFF"}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.is_read && { color: "#777" }]}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.created_at}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Notifications" showBack={true} />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  readNotification: {
    backgroundColor: "#f0f0f0",
  },
  iconContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
