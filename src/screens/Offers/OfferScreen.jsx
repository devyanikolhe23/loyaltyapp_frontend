// src/screens/offers/OffersScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const OfferCard = ({ offer }) => {
  const navigation = useNavigation();

  // Determine selected service IDs (single or multiple)
  const serviceIds = Array.isArray(offer.services)
    ? offer.services
    : offer.service
      ? [offer.service]
      : [];

  return (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={() =>
        navigation.navigate("BookingServiceScreen", {
          offerId: offer.id,
          serviceIds,
          discount: offer.discount_percentage || 0,
          offerTitle: offer.title || "",
        })
      }
    >
      <Image
        source={{ uri: offer.image_url || "https://via.placeholder.com/150" }}
        style={styles.offerImage}
      />
      <View style={styles.offerDetails}>
        <Text style={styles.offerTitle}>{offer.title}</Text>
        {offer.description && (
          <Text style={styles.offerDescription}>{offer.description}</Text>
        )}
        {offer.discount_percentage && (
          <Text style={styles.offerDiscount}>
            {offer.discount_percentage}% OFF
          </Text>
        )}
        <Text style={styles.offerValidity}>
          {offer.valid_from ? new Date(offer.valid_from).toLocaleDateString() : ""} -{" "}
          {offer.valid_to ? new Date(offer.valid_to).toLocaleDateString() : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const OffersScreen = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const API_URL = "http://192.168.1.8:8000/api/offers/";

  // Fetch offers from backend
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API_URL}?no_pagination=true`);
      console.log("RAW API RESPONSE:", res.data);  // <-- add this
      const data = res.data.results || [];
      console.log("Parsed offers:", data.map(o => o.title));
      setOffers(data);
    } catch (err) {
      console.log("Error fetching offers:", err);
      setOffers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  // Pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchOffers();
  };

  // Initial fetch
  useEffect(() => {
    fetchOffers();
  }, []);

  // Re-fetch whenever screen comes into focus
  useEffect(() => {
    if (isFocused) {
      fetchOffers();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Offers" showBack={false} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {offers.length > 0 ? (
          offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
        ) : (
          <Text style={styles.noOfferText}>No offers available right now.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default OffersScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 16,
  },
  offerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  offerImage: {
    width: 130,
    height: "100%",
    resizeMode: "cover",
  },
  offerDetails: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: "#6A6A6A",
    marginBottom: 4,
  },
  offerDiscount: {
    color: "#0A8A00",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  offerValidity: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  noOfferText: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 16,
  },
});




// // src/screens/offers/OffersScreen.js
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   RefreshControl,
//   TouchableOpacity,
// } from "react-native";
// import Header from "../../components/Header";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";

// const OfferCard = ({ offer }) => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       style={styles.offerCard}
//       onPress={() =>
//         navigation.navigate("BookingServiceScreen", {
//           serviceId: offer.service,
//           discount: offer.discount_percentage,
//           offerTitle: offer.title,
//         })
//       }
//     >
//       {/* Left Image */}
//       <Image
//         source={{ uri: offer.image_url || "https://via.placeholder.com/150" }}
//         style={styles.offerImage}
//       />

//       {/* Right Details */}
//       <View style={styles.offerDetails}>
//         <Text style={styles.offerTitle}>{offer.title}</Text>
//         <Text style={styles.offerDescription}>{offer.description}</Text>

//         {offer.discount_percentage && (
//           <Text style={styles.offerDiscount}>{offer.discount_percentage}% Off</Text>
//         )}

//         <Text style={styles.offerValidity}>
//           {new Date(offer.valid_from).toLocaleDateString()} -{" "}
//           {new Date(offer.valid_to).toLocaleDateString()}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const OffersScreen = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const API_URL = "http://192.168.1.15:8000/api/offers/";

//   const fetchOffers = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       console.log("Offers API:", res.data);

//       // Check pagination
//       if (res.data.results) {
//         setOffers(res.data.results);
//       } else {
//         setOffers(res.data);
//       }
//     } catch (err) {
//       console.log("Error fetching offers:", err);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchOffers();
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     fetchOffers().finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Header title="Offers" showBack={false} />

//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {offers.length > 0 ? (
//           offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
//         ) : (
//           <Text style={styles.noOfferText}>No offers available right now.</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default OffersScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F9F9F9" },

//   scrollContainer: { padding: 16 },

//   offerCard: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: "hidden",
//     elevation: 3,
//   },

//   offerImage: {
//     width: 130,
//     height: "100%",
//     resizeMode: "cover",
//   },

//   offerDetails: {
//     flex: 1,
//     padding: 14,
//     justifyContent: "center",
//   },

//   offerTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1C1C1C",
//     marginBottom: 4,
//   },

//   offerDescription: {
//     fontSize: 14,
//     color: "#6A6A6A",
//     marginBottom: 4,
//   },

//   offerDiscount: {
//     color: "#0A8A00",
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 4,
//   },

//   offerValidity: {
//     fontSize: 12,
//     color: "#999",
//     marginTop: 2,
//   },

//   noOfferText: {
//     textAlign: "center",
//     color: "#777",
//     marginTop: 40,
//     fontSize: 16,
//   },
// });


