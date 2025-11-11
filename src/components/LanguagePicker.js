import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countryLanguage from "country-language";

export default function LanguagePicker() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved language when component mounts
    const loadData = async () => {
      try {
        // Get saved language
        const savedLang = await AsyncStorage.getItem("selectedLanguage");

        // Fetch all Indian languages using package
        const langs = countryLanguage.getCountryLanguages("IN");
        const formatted = langs.map((lang) => ({
          label: lang.name,
          value: lang.iso639_1 || lang.name,
        }));

        setLanguages(formatted);
        if (savedLang) setSelectedLanguage(savedLang);
      } catch (err) {
        console.error("Error loading languages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLanguageSelect = async (value) => {
    setSelectedLanguage(value);
    try {
      await AsyncStorage.setItem("selectedLanguage", value);
      console.log("Language saved:", value);
    } catch (err) {
      console.error("Error saving language:", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading languages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your preferred language</Text>
      <RNPickerSelect
        onValueChange={handleLanguageSelect}
        items={languages}
        value={selectedLanguage}
        placeholder={{ label: "Select Language", value: null }}
        style={{
          inputAndroid: styles.picker,
          inputIOS: styles.picker,
        }}
      />
      {selectedLanguage && (
        <Text style={styles.selectedText}>
          Selected: {selectedLanguage.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  selectedText: {
    marginTop: 15,
    fontSize: 16,
    color: "#007bff",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
