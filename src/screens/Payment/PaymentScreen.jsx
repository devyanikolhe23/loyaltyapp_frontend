import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [method, setMethod] = useState("card"); // card | upi

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1B1B1B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.methodBox,
            method === "card" && styles.methodBoxSelected,
          ]}
          onPress={() => setMethod("card")}
        >
          <View style={styles.methodLeft}>
            <Ionicons name="card-outline" size={22} color="#444" />
            <Text style={styles.methodText}>Credit Card</Text>
          </View>
          <Ionicons
            name={method === "card" ? "radio-button-on" : "radio-button-off"}
            size={22}
            color="#0A84FF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodBox,
            method === "upi" && styles.methodBoxSelected,
          ]}
          onPress={() => setMethod("upi")}
        >
          <View style={styles.methodLeft}>
            <Ionicons name="phone-portrait-outline" size={22} color="#444" />
            <Text style={styles.methodText}>Mobile Pay</Text>
          </View>
          <Ionicons
            name={method === "upi" ? "radio-button-on" : "radio-button-off"}
            size={22}
            color="#0A84FF"
          />
        </TouchableOpacity>

        {/* Card Form */}
        {method === "card" && (
          <>
            <Text style={styles.sectionTitle}>Payment Details</Text>

            <View style={styles.inputBox}>
              <Ionicons name="card-outline" size={18} color="#808080" />
              <TextInput placeholder="Card Number" style={styles.input} />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputBox, { flex: 1, marginRight: 10 }]}>
                <Ionicons name="calendar-outline" size={18} color="#808080" />
                <TextInput placeholder="MM/YY" style={styles.input} />
              </View>

              <View style={[styles.inputBox, { flex: 1 }]}>
                <Ionicons name="lock-closed-outline" size={18} color="#808080" />
                <TextInput placeholder="CVC" style={styles.input} />
              </View>
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={18} color="#808080" />
              <TextInput placeholder="Name on Card" style={styles.input} />
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Payment Row */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>$120.00</Text>
        </View>

        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText}>Pay Securely</Text>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1B1B1B" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#2D2D2D",
  },

  methodBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  methodBoxSelected: {
    borderColor: "#0A84FF",
    shadowColor: "#0A84FF",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  methodLeft: { flexDirection: "row", alignItems: "center" },
  methodText: { marginLeft: 12, fontSize: 15, color: "#2D2D2D" },

  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    flexDirection: "row",
    alignItems: "center",
  },
  input: { marginLeft: 10, flex: 1 },

  row: { flexDirection: "row" },

  bottomBar: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  totalLabel: { color: "#555", fontSize: 13 },
  totalValue: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  payButton: {
    backgroundColor: "#0A84FF",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  payText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
