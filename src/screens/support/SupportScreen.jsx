import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import FaqTile from "../../components/support/FaqTile";
import ContactTile from "../../components/support/ContactTile";
import ResourceTile from "../../components/support/ResourceTile";
import Header from "../../components/Header";
import colors from "../../utils/color";
import textStyles from "../../utils/textStyles";
import globalStyles from "../../utils/styles";

const SupportScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Support" showBack={false} />
      {/* Header (same as ServiceScreen) */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={styles.headerSpacer} />
      </View> */}

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={globalStyles.contentContainer}>
        {/* FAQ Section */}
        <Text style={textStyles.subHeading}>Frequently Asked Questions</Text>
        <FaqTile question="How do I book a service?" />
        <FaqTile question="What payment methods do you accept?" />
        <FaqTile question="Can I cancel or reschedule my booking?" />

        {/* Contact Section */}
        <Text style={textStyles.subHeading}>Contact Us</Text>
        <ContactTile icon="chatbubble-ellipses-outline" text="Chat with us" />
        <ContactTile icon="call-outline" text="Call us" />
        <ContactTile icon="mail-outline" text="Email us" />

        {/* Helpful Resources */}
        <Text style={textStyles.subHeading}>Helpful Resources</Text>
        <ResourceTile
          icon="document-text-outline"
          text="Terms of Service"
          onPress={() => navigation.navigate("TermsAndConditionsScreen")}
        />
        <ResourceTile
          icon="shield-checkmark-outline"
          text="Privacy Policy"
          onPress={() => console.log("Navigate to Privacy Policy")}
        />
        <ResourceTile
          icon="car-outline"
          text="Driving Tips"
          onPress={() => navigation.navigate("DrivingTipsScreen")}
        />
        <ResourceTile
          icon="help-circle-outline"   // ✅ Help Center icon
          text="Help Center"
          onPress={() => navigation.navigate("HelpCenterScreen")}
        />
      </ScrollView>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" }, 
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: colors.dark },
  headerSpacer: { width: 24 }, // balances arrow for proper centering
});
