// LoyaltyRewardsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

const LoyaltyRewardsScreen = ({ navigation }) => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [earnRules, setEarnRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);


  const buildHeaders = (accessToken) => ({
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
  });

  const fetchWithAuth = async (url, options = {}) => {
    let access = await AsyncStorage.getItem("access");
    const refresh = await AsyncStorage.getItem("refresh");
    console.log("Access token:", access);
    console.log("Refresh token:", refresh);
    // debug
    // console.log("fetchWithAuth initial access:", access, "url:", url);

    // first attempt
    let res = await fetch(url, { ...options, headers: { ...(options.headers || {}), ...buildHeaders(access) } });

    // if token invalid/expired -> try refresh (only once)
    if (res.status === 401 || res.status === 403) {
      // no refresh stored -> force re-login
      if (!refresh) {
        throw new Error("Session expired (no refresh token). Please login again.");
      }

      // call refresh endpoint
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      let refreshJson = null;
      try {
        refreshJson = await refreshRes.json();
      } catch (e) {
        // nothing
      }

      // debug
      // console.log("refreshRes.ok", refreshRes.ok, "body:", refreshJson);

      if (!refreshRes.ok || !refreshJson?.access) {
        // invalid refresh -> remove tokens and force login
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");
        throw new Error("Session expired. Please log in again.");
      }

      // save new access and retry original request
      access = refreshJson.access;
      await AsyncStorage.setItem("access", access);
      res = await fetch(url, { ...options, headers: { ...(options.headers || {}), ...buildHeaders(access) } });
    }

    return res;
  };

  // fetch points, rewards, earn rules
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pointsRes, rewardsRes, earnRes] = await Promise.all([
        fetchWithAuth(`${BASE_URL}/api/points/`, { method: "GET" }),
        fetchWithAuth(`${BASE_URL}/rewards/`, { method: "GET" }),
        fetchWithAuth(`${BASE_URL}/earn-rules/`, { method: "GET" }),
      ]);

      // points
      if (!pointsRes.ok) {
        const txt = await pointsRes.text();
        throw new Error(`Failed to fetch points: ${txt}`);
      }
      const pointsJson = await pointsRes.json();
      setPoints(pointsJson?.points ?? 0);

      // rewards (handle list or paginated {results:[]})
      if (rewardsRes.ok) {
        const rewardsJson = await rewardsRes.json();
        const rewardsList = Array.isArray(rewardsJson) ? rewardsJson : rewardsJson.results ?? [];
        setRewards(rewardsList);
      } else {
        const errText = await rewardsRes.text();
        console.warn("Rewards fetch failed:", errText);
        setRewards([]);
      }

      // earn rules
      if (earnRes.ok) {
        const earnJson = await earnRes.json();
        const earnList = Array.isArray(earnJson) ? earnJson : earnJson.results ?? [];
        setEarnRules(earnList);
      } else {
        setEarnRules([]);
      }
    } catch (err) {
      console.log("fetchAll error:", err);
      if (String(err).toLowerCase().includes("login") || String(err).toLowerCase().includes("session")) {
        Alert.alert("Session", String(err), [{ text: "OK", onPress: () => navigation?.navigate?.("Login") }]);
      } else {
        Alert.alert("Error", String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // // redeem reward
  // const handleRedeem = async (rewardId) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetchWithAuth(`${BASE_URL}/api/rewards/redeem/`, {
  //       method: "POST",
  //       body: JSON.stringify({ reward_id: rewardId }),
  //     });

  //     let json = {};
  //     try {
  //       json = await res.json();
  //     } catch (e) { }

  //     if (res.ok) {
  //       Alert.alert("Success", json.message || "Redeemed successfully");
  //       await fetchAll();
  //     } else {
  //       const msg = json.detail || json.message || "Failed to redeem reward";
  //       Alert.alert("Redeem failed", msg);
  //     }
  //   } catch (err) {
  //     console.log("redeem error:", err);
  //     Alert.alert("Error", err.message || "Error redeeming reward");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // compute next reward threshold
  const nextReward = (rewards || [])
    .filter((r) => (r.required_points ?? Infinity) > points)
    .sort((a, b) => (a.required_points ?? Infinity) - (b.required_points ?? Infinity))[0];

  const progressPct = nextReward ? Math.min((points / nextReward.required_points) * 100, 100) : 100;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty Rewards</Text>
        <Icon name="dots-vertical" size={24} color="#000" />
      </View>

      {/* Points */}
      <View style={styles.profileSection}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/7436/7436964.png" }} style={styles.profileImage} />
        <Text style={styles.points}>{(points || 0).toLocaleString()} Points</Text>
        <Text style={styles.nextReward}>
          {nextReward ? `Next reward at ${nextReward.required_points.toLocaleString()} points` : "No further rewards"}
        </Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {/* Rewards */}
      <Text style={styles.sectionTitle}>Available Rewards</Text>
      {(!rewards || rewards.length === 0) ? (
        <Text style={{ color: "#666", marginBottom: 12 }}>No rewards available.</Text>
      ) : (
        rewards.map((r) => (
          <View key={r.id} style={styles.card}>
            <Image source={{ uri: r.image || "https://cdn-icons-png.flaticon.com/512/7436/7436964.png" }} style={styles.rewardImage} />
            <View style={styles.rewardText}>
              <Text style={styles.rewardPoints}>{(r.required_points ?? 0).toLocaleString()} Points</Text>
              <Text style={styles.rewardTitle}>{r.title}</Text>
              <Text style={styles.rewardDesc}>{r.description}</Text>
            </View>
            <TouchableOpacity
              style={[styles.redeemButton, { backgroundColor: points >= (r.required_points ?? Infinity) ? "#3B82F6" : "#E5E7EB" }]}
              onPress={() => {
                if (points >= (r.required_points ?? Infinity)) {
                  console.log("Reward service:", r.service);

                  if (r.service) {

                    navigation.navigate("BookingServiceScreen", {
                      serviceId: r.service,
                      rewardId: r.id,
                      rewardPoints: r.required_points,
                      rewardTitle: r.title,
                      rewardType: r.type,
                      rewardDiscountValue: r.discount_value,
                     
                    });
                  } else {
                    Alert.alert("Invalid Reward", "This reward is not linked to any service.");
                  }
                } else {
                  Alert.alert("Not enough points", "You don't have enough points to redeem this reward.");
                }
              }}

            >
              <Text style={[styles.redeemText, { color: points >= (r.required_points ?? Infinity) ? "#fff" : "#374151" }]}>Redeem</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* How to Earn */}
      <Text style={styles.sectionTitle}>How to Earn Points</Text>
      {(!earnRules || earnRules.length === 0) ? (
        <Text style={{ color: "#666", marginBottom: 12 }}>No earning rules available.</Text>
      ) : (
        earnRules.map((rule) => (
          <View key={rule.id} style={styles.earnCard}>
            <Icon name={rule.icon || "star-outline"} size={30} color="#3B82F6" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.rewardTitle}>{rule.title}</Text>
              <Text style={styles.rewardDesc}>{rule.description}</Text>
            </View>
            <Text style={{ fontWeight: "700" }}>+{rule.points}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default LoyaltyRewardsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  points: { fontSize: 28, fontWeight: "700" },
  nextReward: { fontSize: 14, color: "#666", marginBottom: 10 },
  progressBarBackground: { width: "80%", height: 8, backgroundColor: "#E5E7EB", borderRadius: 5 },
  progressBarFill: { height: "100%", backgroundColor: "#3B82F6", borderRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 12 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", padding: 12, borderRadius: 12, marginBottom: 10 },
  rewardImage: { width: 60, height: 60, borderRadius: 12 },
  rewardText: { flex: 1, marginLeft: 12 },
  rewardPoints: { color: "#3B82F6", fontWeight: "600" },
  rewardTitle: { fontSize: 16, fontWeight: "600" },
  rewardDesc: { fontSize: 14, color: "#555" },
  redeemButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  redeemText: { fontWeight: "600" },
  earnCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", padding: 12, borderRadius: 12, marginBottom: 10, justifyContent: "space-between" },
});
