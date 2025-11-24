import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

      <ScrollView contentContainerStyle={globalStyles.contentContainer}>
        {/* FAQ Section */}
        <Text style={textStyles.subHeading}>Frequently Asked Questions</Text>

        <FaqTile
          question="How do I book a service?"
          answer="You can easily book a service by navigating to the 'Book Service' section in the app, selecting your preferred service type, date, and time, and confirming your booking."
        />

        <FaqTile
          question="What payment methods do you accept?"
          answer="We accept all major payment methods, including credit/debit cards, UPI, and digital wallets such as Google Pay and Paytm."
        />

        <FaqTile
          question="Can I cancel or reschedule my booking?"
          answer="Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled service time. Go to the 'My Bookings' section and select 'Cancel' or 'Reschedule'."
        />

        {/* Contact Section */}
        <Text style={textStyles.subHeading}>Contact Us</Text>

        <ContactTile
          icon="chatbubble-ellipses-outline"
          text="Chat with us"
          onPress={() => navigation.navigate("SupportChatScreen")}
        />

        <ContactTile
          icon="call-outline"
          text="Call us"
          onPress={() => navigation.navigate("CallUsScreen")}
        />

        <ContactTile
          icon="mail-outline"
          text="Email us"
          onPress={() => navigation.navigate("EmailUsScreen")}
        />

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
          onPress={() => navigation.navigate("InsurancePolicyScreen")}
        />
        <ResourceTile
          icon="car-outline"
          text="Driving Tips"
          onPress={() => navigation.navigate("DrivingTipsScreen")}
        />
        <ResourceTile
          icon="help-circle-outline"
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
});
