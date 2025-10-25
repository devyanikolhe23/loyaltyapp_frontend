import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const ServiceCard = ({ title, description, price, image, tag,serviceData }) => { 
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        {tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Rs{price}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: image}}
  style={styles.image} />
        <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate('ServiceDetailScreen', { service: serviceData })}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  textContainer: { flex: 1 },
  tag: {
    backgroundColor: "#E6F0FF",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  tagText: { fontSize: 12, fontWeight: "600", color: "#0066FF" },
  title: { fontSize: 16, fontWeight: "700", color: "#000" },
  description: { fontSize: 13, color: "#666", marginVertical: 2 },
  price: { fontSize: 15, fontWeight: "600", color: "#0066FF", marginTop: 4 },
  imageContainer: { marginLeft: 10, alignItems: "center" },
  image: { width: 90, height: 70, borderRadius: 10 },
  addButton: {
    position: "absolute",
    bottom: -8,
    right: -8,
    backgroundColor: "#0066FF",
    borderRadius: 20,
    padding: 6,
  },
});
