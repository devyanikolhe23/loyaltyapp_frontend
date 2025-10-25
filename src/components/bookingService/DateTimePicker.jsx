import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DateTimePickerComponent() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hidePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Choose Date & Time</Text>

      <TouchableOpacity style={styles.dateButton} onPress={showPicker}>
        <Text style={styles.dateText}>
          {selectedDate
            ? selectedDate.toLocaleString()
            : "Select appointment date & time"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        minimumDate={new Date()}
        display={Platform.OS === "ios" ? "inline" : "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  dateButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  dateText: { fontSize: 16, color: "#333" },
});
