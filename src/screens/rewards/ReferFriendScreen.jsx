import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from "react-native";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.15:8000";

const ReferFriendScreen = () => {
  const [referralCode, setReferralCode] = useState("");
  const [invitedCount, setInvitedCount] = useState(0);
  const [rewardsEarned, setRewardsEarned] = useState(0);
  const [loading, setLoading] = useState(true);

  // ----------------------------------
  // FETCH REFERRAL DASHBOARD DATA
  // ----------------------------------
  const fetchReferralData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) {
        console.log("No access token found");
        return;
      }

      const response = await fetch(`${BASE_URL}/referral/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Referral Dashboard Response:", data);

      setReferralCode(data?.referral_code || "");
      setInvitedCount(data?.invited_count || 0);
      setRewardsEarned(data?.rewards_earned || 0);
    } catch (error) {
      console.log("Referral fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  // ----------------------------------
  // SHARE REFERRAL
  // ----------------------------------
  const onShare = async () => {
    try {
      await Share.share({
         message: `🎉 Join me on Loyalty App ! Use my referral code : ${referralCode} and get rewards on your first booking. Download the app: https://play.google.com/store/apps/details?id=com.app.churchkonnect`,
        // message: `Hey! Use my referral code ${referralCode} and get rewards on your first booking. Download the app: https://carservices.com/app`,
      });
    } catch (error) {
      console.log("Share Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Refer a Friend" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Image
          source={require("../../assets/images/image.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Invite friends, earn rewards</Text>

        <Text style={styles.subtitle}>
          Share your referral code with friends. When they book their first service, you both get a reward.
        </Text>

        {/* Referral Code Box */}
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Your Referral Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode || "----"}</Text>
          </View>
        </View>

        {/* Sharing Buttons */}
        <View style={styles.shareRow}>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Ionicons name="share-outline" size={18} color="#000" />
            <Text style={styles.shareText}> Share Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() =>
              Share.share({
                message: `Use my referral code ${referralCode} on Car Service App!`,
              })
            }
          >
            <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            <Text style={styles.whatsappText}> WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Referral Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referral Status</Text>

          <View style={styles.statusCard}>
            <View style={styles.statusLeft}>
              <Ionicons name="people-outline" size={22} color="#25D366" />
              <Text style={styles.statusLabel}>Invited</Text>
            </View>
            <Text style={styles.statusValue}>{invitedCount} friends</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: "#FFF7E6" }]}>
            <View style={styles.statusLeft}>
              <Ionicons name="ribbon-outline" size={22} color="#F5A623" />
              <Text style={styles.statusLabel}>Rewards Earned</Text>
            </View>
            <Text style={styles.statusValue}>{rewardsEarned} rewards</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default ReferFriendScreen;




const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContainer: { padding: 20, alignItems: "center" },

  // 🎉 Illustration
  image: { width: "100%", height: 180, marginBottom: 25 },

  // 🏆 Title and Description
  title: { fontSize: 20, fontWeight: "700", color: "#000", textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },

  // 💬 Referral Code Box
  codeBox: { width: "100%", alignItems: "center", marginBottom: 20 },
  codeLabel: { fontSize: 14, color: "#444", marginBottom: 6 },
  codeContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  codeText: { fontSize: 16, fontWeight: "600", letterSpacing: 1, color: "#000" },

  // 🔗 Share Buttons
  shareRow: { flexDirection: "row", justifyContent: "space-between", width: "85%", marginVertical: 10 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flex: 1,
    marginRight: 10,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9FCEF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
  },
  shareText: { fontSize: 14, fontWeight: "600", color: "#000" },
  whatsappText: { fontSize: 14, fontWeight: "600", color: "#25D366" },

  // 📊 Referral Status Section
  section: { width: "100%", marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#000", marginBottom: 12, alignSelf: "flex-start" },

  statusCard: {
    backgroundColor: "#EAF4FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLeft: { flexDirection: "row", alignItems: "center" },
  statusLabel: { marginLeft: 8, fontSize: 15, color: "#000", fontWeight: "500" },
  statusValue: { fontSize: 15, fontWeight: "600", color: "#000" },
});
