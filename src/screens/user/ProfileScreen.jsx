import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileImagePicker from "../../components/profile/ProfileImagePicker";
import { launchImageLibrary } from "react-native-image-picker";

const BASE_URL = "http://192.168.1.8:8000";

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    membership: "",
    joined: "",
    image: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const access = await AsyncStorage.getItem("access");
        const storedUser = await AsyncStorage.getItem("user");

        if (!storedUser || !access) {
          console.log("⚠️ No user logged in — showing Guest profile");
          setProfile({
            name: "Guest User",
            membership: "Member",
            joined: "2025",
          });
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        const response = await axios.get(`${BASE_URL}/api/users/${user.id}/`, {
          headers: { Authorization: `Bearer ${access}` },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Update profile
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const access = await AsyncStorage.getItem("access");
      await axios.put(`${BASE_URL}/users/me/`, profile, {
        headers: { Authorization: `Bearer ${access}` },
      });

      await AsyncStorage.setItem("user", JSON.stringify(profile));
      Alert.alert("Success", "Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Image Upload / Delete Handlers
  const handleEditProfileImage = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        { text: "Upload", onPress: pickImage },
        { text: "Delete", onPress: handleDeleteImage },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
      });
      if (result.didCancel || !result.assets?.length) return;

      const selectedImage = result.assets[0];
      const access = await AsyncStorage.getItem("access");

      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName || "profile.jpg",
      });

      const uploadResponse = await axios.put(`${BASE_URL}/users/me/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(uploadResponse.data);
      await AsyncStorage.setItem("user", JSON.stringify(uploadResponse.data));

      Alert.alert("Success", "Profile picture updated!");
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const handleDeleteImage = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      await axios.put(
        `${BASE_URL}/users/me/`,
        { image: null },
        { headers: { Authorization: `Bearer ${access}` } }
      );

      setProfile({ ...profile, image: null });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...profile, image: null })
      );

      Alert.alert("Profile picture removed!");
    } catch (error) {
      console.error("Error deleting image:", error);
      Alert.alert("Error", "Failed to delete image.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" showBack={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔹 Profile Header */}
        <View style={styles.profileHeader}>
          <ProfileImagePicker
            uri={profile.image}
            onImageUpdate={(newUrl) => {
              setProfile({ ...profile, image: newUrl });
              AsyncStorage.setItem(
                "user",
                JSON.stringify({ ...profile, image: newUrl })
              );
            }}
            onEditPress={handleEditProfileImage}
          />
          <Text style={styles.name}>{profile.username || "Guest User"}</Text>
          <View style={styles.memberTag}>
            <Text style={styles.memberText}>
              {profile.membership || "Member"}
            </Text>
          </View>
          <Text style={styles.joinedText}>
            Joined {profile.joined || "2025"}
          </Text>
        </View>

        {/* 🔹 Account Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity onPress={() => setEditing(!editing)}>
              <MaterialIcon
                name={editing ? "close" : "edit"}
                size={22}
                color="#007bff"
              />
            </TouchableOpacity>
          </View>

          {/* Username */}
          <View style={styles.item}>
            <Ionicons name="person-outline" size={20} color="#444" />
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.username}
                onChangeText={(text) =>
                  setProfile({ ...profile, username: text })
                }
                placeholder="Enter name"
              />
            ) : (
              <Text style={styles.itemText}>{profile.username}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.item}>
            <Ionicons name="mail-outline" size={20} color="#444" />
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder="Enter email"
              />
            ) : (
              <Text style={styles.itemText}>{profile.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View style={styles.item}>
            <Ionicons name="call-outline" size={20} color="#444" />
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.phone_number}
                onChangeText={(text) =>
                  setProfile({ ...profile, phone_number: text })
                }
                placeholder="Enter phone number"
              />
            ) : (
              <Text style={styles.itemText}>{profile.phone_number}</Text>
            )}
          </View>

          {/* Address */}
          <View style={styles.item}>
            <Ionicons name="location-outline" size={20} color="#444" />
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.address}
                onChangeText={(text) =>
                  setProfile({ ...profile, address: text })
                }
                placeholder="Enter address"
              />
            ) : (
              <Text style={styles.itemText}>{profile.address}</Text>
            )}
          </View>

          {editing && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 🔹 Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.item}>
            <Ionicons name="notifications-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#ccc", true: "#007bff" }}
              thumbColor="#fff"
            />
          </View>

          {/* <View style={styles.item}>
            <Ionicons name="language-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Language</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          </View> */}
        </View>

        {/* 🔹 More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ServiceHistoryScreen')}
          >
            <FontAwesome5 name="history" size={18} color="#444" />
            <Text style={styles.itemText}>Service History</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('LoyaltyRewardsScreen')}
          >
            <FontAwesome5 name="medal" size={18} color="#444" />
            <Text style={styles.itemText}>Loyalty Rewards</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ReferFriendScreen')}
          >
            <Ionicons name="person-add-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Refer a Friend</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('MyVehiclesScreen')}
          >
            <Ionicons name="car-outline" size={20} color="#444" />
            <Text style={styles.itemText}>My Vehicles</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 50 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  profileHeader: { alignItems: "center", marginTop: 30, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  memberTag: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },
  memberText: { fontSize: 12, color: "#333" },
  joinedText: { fontSize: 12, color: "#888", marginTop: 2 },
  section: { marginTop: 25 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#222" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: { flex: 1, marginHorizontal: 10, color: "#333" },
  input: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
