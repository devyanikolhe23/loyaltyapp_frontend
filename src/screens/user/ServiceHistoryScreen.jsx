import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

export default function ServiceHistoryScreen() {
  const navigation = useNavigation();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) {
        setErrorMsg("Not authenticated. Please login.");
        setHistoryData([]);
        return;
      }

      const response = await fetch(`${BASE_URL}/bookings/history/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // read text first so we can debug non-JSON responses
      const raw = await response.text();
      console.log("SERVICE HISTORY - RAW RESPONSE:", raw);

      // if unauthorized
      if (response.status === 401 || response.status === 403) {
        setErrorMsg("Session expired or unauthorized. Please login again.");
        // optional: navigate to login
        // navigation.navigate("LoginScreen");
        setHistoryData([]);
        return;
      }

      // try parse JSON safely
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.log("SERVICE HISTORY - JSON PARSE ERROR:", e);
        setErrorMsg("Server returned unexpected response.");
        setHistoryData([]);
        return;
      }

      // if server returned an error object instead of list
      if (!Array.isArray(data)) {
        // DRF sometimes returns {detail: "..."} or paginated object
        if (data?.results && Array.isArray(data.results)) {
          setHistoryData(data.results);
        } else if (data?.detail) {
          setErrorMsg(String(data.detail));
          setHistoryData([]);
        } else {
          // unexpected shape
          setErrorMsg("Unexpected data shape from server.");
          setHistoryData([]);
        }
      } else {
        // successful array
        setHistoryData(data);
      }
    } catch (err) {
      console.log("SERVICE HISTORY - FETCH ERROR:", err);
      setErrorMsg("Network error while fetching history.");
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // optionally refetch when screen focuses; left out for simplicity
  }, []);

  const renderItem = ({ item }) => {
    const serviceTitle = item.service_title ?? (item.services && item.services.length ? item.services.join(", ") : "Service");
    const price = item.total_price ?? "0.00";
    const date = item.appointment_date ?? item.booking_date ?? "Unknown date";
    const notes = item.notes ?? "No notes available";
    const status = (item.status || "").replace(/_/g, " ").toUpperCase();

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>{serviceTitle}</Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>

        <Text style={styles.date}>{date}</Text>

        <Text style={styles.notes}>
          <Text style={styles.bold}>Service Notes: </Text>
          {notes}
        </Text>

        <Text style={styles.status}>Status: {status || "N/A"}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Service History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : errorMsg ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setErrorMsg(null);
              fetchHistory();
            }}
          >
            <Text style={{ color: "#fff" }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : historyData.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
            No service history found
          </Text>
        </View>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  headerText: { fontSize: 20, fontWeight: "600" },
  center: { alignItems: "center", marginTop: 40 },
  errorText: { color: "#B00020", marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 18, fontWeight: "600", color: "#1C1C1C" },
  price: { fontSize: 16, fontWeight: "600", color: "#007BFF" },
  date: { color: "#6B7280", marginVertical: 8 },
  notes: { color: "#1E1E1E", lineHeight: 20 },
  bold: { fontWeight: "600" },
  status: { marginTop: 8, fontStyle: "italic", color: "#007BFF" },
});
