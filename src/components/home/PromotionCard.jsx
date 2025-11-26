// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// const PromotionCard = ({ image, title, description, navigation, promo, isSelected, onSelect }) => {
//   const handlePress = () => {
//     onSelect(); // tell parent this card is selected
//     navigation.navigate("BookingServiceScreen", { promo });
//   };

//   return (
//     <TouchableOpacity
//       style={[styles.card, isSelected && styles.selectedCard]}
//       onPress={handlePress}
//       activeOpacity={0.8}
//     >
//       <Image source={image} style={styles.image} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.description}>{description}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: 240,
//     marginRight: 16,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 3,
//     borderWidth: 2,
//     borderColor: 'transparent', // default
//   },
//   selectedCard: {
//     borderColor: '#007BFF', // highlight
//   },
//   image: { width: '100%', height: 120, resizeMode: 'cover' },
//   textContainer: { padding: 12 },
//   title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
//   description: { fontSize: 13, color: '#555' },
// });

// export default PromotionCard;
