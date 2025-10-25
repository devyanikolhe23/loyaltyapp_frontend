import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LoyaltyRewardsScreen = () => {
  const points = 1250;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty Rewards</Text>
        <Icon name="dots-vertical" size={24} color="#000" />
      </View>

      {/* User Points */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/7436/7436964.png" }}
          style={styles.profileImage}
        />
        <Text style={styles.points}>{points.toLocaleString()} Points</Text>
        <Text style={styles.nextReward}>Next reward at 2,000 points</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${(points / 2000) * 100}%` }]} />
        </View>
      </View>

      {/* Available Rewards */}
      <Text style={styles.sectionTitle}>Available Rewards</Text>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/7436/7436964.png" }}
          style={styles.rewardImage}
        />
        <View style={styles.rewardText}>
          <Text style={styles.rewardPoints}>2,000 Points</Text>
          <Text style={styles.rewardTitle}>Free Oil Change</Text>
          <Text style={styles.rewardDesc}>Get a free oil change service</Text>
        </View>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/7436/7436964.png" }}
          style={styles.rewardImage}
        />
        <View style={styles.rewardText}>
          <Text style={styles.rewardPoints}>3,000 Points</Text>
          <Text style={styles.rewardTitle}>Free Tire Rotation</Text>
          <Text style={styles.rewardDesc}>Get a free tire rotation service</Text>
        </View>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {/* How to Earn Points */}
      <Text style={styles.sectionTitle}>How to Earn Points</Text>
      <View style={styles.earnCard}>
        <Icon name="car" size={30} color="#3B82F6" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.rewardTitle}>Spend on Services</Text>
          <Text style={styles.rewardDesc}>Earn 10 points for every $1 spent</Text>
        </View>
      </View>

      <View style={styles.earnCard}>
        <Icon name="star-outline" size={30} color="#3B82F6" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.rewardTitle}>Leave Reviews</Text>
          <Text style={styles.rewardDesc}>Earn 50 points for every review</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoyaltyRewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  points: {
    fontSize: 28,
    fontWeight: "700",
  },
  nextReward: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  progressBarBackground: {
    width: "80%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  rewardText: {
    flex: 1,
    marginLeft: 12,
  },
  rewardPoints: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rewardDesc: {
    fontSize: 14,
    color: "#555",
  },
  redeemButton: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  redeemText: {
    fontWeight: "600",
    color: "#374151",
  },
  earnCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
});
