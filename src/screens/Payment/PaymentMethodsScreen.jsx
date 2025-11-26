import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />{/* For spacing */}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Saved Payment Methods */}
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>

        <View style={styles.cardList}>
          <View style={styles.cardItem}>
            <Ionicons name="card-outline" size={32} color="#ccc" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardText}>Visa ... 4567</Text>
              <Text style={styles.cardSub}>Expires 12/25</Text>
            </View>
            <View style={styles.defaultTag}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#bbb" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardItem}>
            <Ionicons name="card-outline" size={32} color="#ccc" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardText}>Mastercard ... 8901</Text>
              <Text style={styles.cardSub}>Expires 08/26</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#bbb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Digital Wallets */}
        <Text style={styles.sectionTitle}>Digital Wallets</Text>

        <View style={styles.cardList}>
          {[
            { title: "PayPal", sub: "jennifer.lee@email.com" },
            { title: "Venmo", sub: "@jennifer-lee" },
            { title: "Apple Pay", sub: "Linked" }
          ].map((item, index) => (
            <View key={index} style={styles.cardItem}>
              <Ionicons name="wallet-outline" size={32} color="#ccc" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardText}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#bbb" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Add Payment Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={22} color="#fff" />
        <Text style={styles.addButtonText}>Add Payment Method</Text>
      </TouchableOpacity>

    </View>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101114" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#101114",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginRight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    marginTop: 20,
  },
  cardList: {
    backgroundColor: "#181A1F",
    borderRadius: 15,
    paddingVertical: 8,
    marginBottom: 8,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#222",
  },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "500" },
  cardSub: { color: "#aaa", fontSize: 14, marginTop: 2 },
  defaultTag: {
    backgroundColor: "#3478F6",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 10,
  },
  defaultText: { color: "#fff", fontSize: 12 },
  addButton: {
    backgroundColor: "#3478F6",
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 6,
  },
});
