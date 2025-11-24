import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DateTimePickerComponent({ defaultDate, defaultTime, onSelectDateTime }) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    // ✅ If editing, pre-fill displayed date/time
    if (defaultDate && defaultTime) {
      setSelectedDateTime(`${defaultDate} ${defaultTime}`);
    }
  }, [defaultDate, defaultTime]);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date) => {
    hidePicker();
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = date.toTimeString().split(" ")[0]; // HH:MM:SS
    setSelectedDateTime(`${formattedDate} ${formattedTime}`);
    onSelectDateTime(formattedDate, formattedTime);
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Date & Time</Text>

      <TouchableOpacity style={styles.dateBox} onPress={showPicker}>
        <Text style={styles.dateText}>
          {selectedDateTime ? selectedDateTime : "Choose Date & Time"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  dateBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  dateText: { fontSize: 16, color: "#333" },
});
