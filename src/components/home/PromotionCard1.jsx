// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const PromotionCard = ({ title, imageUri, description, buttonText, promo, navigation }) => {

//   const handleBooking = async () => {
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       Alert.alert(
//         "Login Required",
//         "Please login first to continue booking.",
//         [{ text: "Login", onPress: () => navigation.navigate("Login") }]
//       );
//       return;
//     }

//     navigation.navigate("BookingServiceScreen", { promo });
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.cardContainer}>
//       <Image source={imageUri} style={styles.cardImage} />
//       <Text style={styles.cardTitle}>{title}</Text>
//       <Text style={styles.cardDescription}>{description}</Text>

//       {/* Bottom actions */}
//       <View style={styles.cardActions}>
//         <TouchableOpacity onPress={handleBooking} style={styles.button}>
//           <Text style={styles.buttonText}>{buttonText}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleBack} style={styles.backLink}>
//           <Text style={styles.backLinkText}>Back to Main Offer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     marginBottom: 16,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   cardImage: { width: '100%', height: 200, resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
//   cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 8, paddingHorizontal: 16 },
//   cardDescription: { fontSize: 14, color: '#555', marginBottom: 8, paddingHorizontal: 16 },
//   cardActions: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 6,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   backLink: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   backLinkText: {
//     color: '#007bff',
//     fontWeight: '600',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   },
// });

// export default PromotionCard;
