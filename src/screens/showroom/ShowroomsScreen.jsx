import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import ShowroomCard from "../../components/showroom/ShowroomCard";

const ShowroomsScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const showrooms = [
    {
      id: "1",
      name: "Luxury Motors",
      address: "Connaught Place, New Delhi",
      lat: 28.6300,
      lng: 77.2167,
      image: require("../../assets/images/exterior_polishing.jpg"),
    },
    {
      id: "2",
      name: "Elite Auto",
      address: "MG Road, Bengaluru",
      lat: 12.9762,
      lng: 77.6033,
      image: require("../../assets/images/oil_change.jpg"),
    },
    {
      id: "3",
      name: "Premium Rides",
      address: "Andheri West, Mumbai",
      lat: 19.1193,
      lng: 72.8290,
      image: require("../../assets/images/reward_car.jpg"),
    },
  ];

  // Build JavaScript for markers
  const markersJS = showrooms
    .map(
      (s) =>
        `L.marker([${s.lat}, ${s.lng}]).addTo(map).bindPopup("<b>${s.name}</b><br>${s.address}");`
    )
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([28.6139, 77.2090], 5);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);
          ${markersJS}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Showrooms</Text>
        <View style={{ width: 24 }} /> {/* placeholder for alignment */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#666"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a showroom"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Map WebView */}
      <View style={styles.mapContainer}>
        <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
      </View>

      {/* Showrooms List */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sectionTitle}>Showrooms</Text>
        <FlatList
          data={showrooms.filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ShowroomCard showroom={item} />}
        />
      </View>
    </View>
  );
};

export default ShowroomsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 16,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#000" },

  mapContainer: {
    flex: 1,
    marginTop: 0,
  },

  searchContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "90%",
    zIndex: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: { flex: 1, color: "#000", fontSize: 14 },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "40%",
  },
  sectionTitle: { color: "#000", fontSize: 16, fontWeight: "600", marginBottom: 10 },
});
