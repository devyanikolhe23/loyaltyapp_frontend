import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import indianlanguage from "../utils/indianlanguage";
import i18n from "../i18n"; // ✅ import i18n config

export default function LanguagePicker() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load saved language from AsyncStorage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("selectedLanguage");
        if (savedLang) {
          setSelectedLanguage(savedLang);
          i18n.changeLanguage(savedLang); // Apply saved language
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLanguage();
  }, []);

  // ✅ When user selects a new language
  const handleLanguageSelect = async (value) => {
    try {
      setSelectedLanguage(value);
      await AsyncStorage.setItem("selectedLanguage", value);
      i18n.changeLanguage(value); // Apply selected language
      console.log("✅ Language saved and changed:", value);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading languages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your preferred language</Text>

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(value) => handleLanguageSelect(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Language" value={null} />
        {(indianlanguage || []).map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>

      {selectedLanguage && (
        <Text style={styles.selectedText}>
          Selected: {selectedLanguage.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  picker: {
    backgroundColor: "black",
    borderRadius: 8,
  },
  selectedText: { marginTop: 15, fontSize: 16, color: "#007bff" },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
