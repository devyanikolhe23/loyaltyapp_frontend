import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "500",
    color: "#555",
    width: "35%",
  },
  value: {
    width: "63%",
    textAlign: "right",
    flexShrink: 1,
    flexWrap: "wrap",
    color: "#000",
  },
});


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function DetailRow({ label, value }) {
//   return (
//     <View style={styles.row}>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={styles.value}>{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
