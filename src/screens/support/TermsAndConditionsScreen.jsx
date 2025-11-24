import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import color from "../../utils/color";
import textStyles from "../../utils/textStyles";
import globalStyles from "../../utils/styles";

// Dummy Logo - Replace or adjust as per your project
// const LOGO = require('../../assets/logo.png'); // path to your logo file

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Terms & Conditions</Text>
  <View style={styles.headerSpacer} />
</View>

      <ScrollView contentContainerStyle={styles.scrollcontainer}>
        {/* <Image source={LOGO} style={styles.logo} /> */}
        <Text style={styles.pageTitle}>Our Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last updated on October 26, 2023</Text>

        {SECTION_DATA.map((section, i) => (
          <View style={styles.card} key={i}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardContent}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} 
       onPress={() => navigation.navigate("SupportScreen")}>
        <Text style={styles.buttonText}>I Understand & Agree</Text>
      </TouchableOpacity>
    </View>
  );
};

const SECTION_DATA = [
  { title: '1. Introduction', content: 'Welcome to our car service booking application. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully.' },
  { title: '2. Service Description', content: 'Our application facilitates the booking of car services, including maintenance, repairs, and detailing. We connect users with certified service providers. We are not responsible for the quality of service provided by third-party providers.' },
  { title: '3. User Responsibilities', content: 'Users are responsible for providing accurate information when booking services. Any changes or cancellations must be made within the specified timeframe. Failure to comply may result in fees or penalties.' },
  { title: '4. Payment Terms', content: 'Payment for services is due upon completion unless otherwise specified. We accept various payment methods as listed in the application. Late payments may incur additional charges.' },
  { title: '5. Liability', content: 'We are not liable for any damages or losses resulting from the use of our application or services provided by third parties. Our liability is limited to the extent permitted by law.' },
  { title: '6. Privacy Policy', content: 'Your privacy is important to us. We collect and use your personal information as described in our Privacy Policy, which is incorporated into these terms by reference.' },
  { title: '7. Modifications', content: 'We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting in the application. Continued use of the application constitutes acceptance of the modified terms.' },
  { title: '8. Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is registered. Any disputes arising from these terms will be resolved in the courts of that jurisdiction.' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafd',
    paddingTop: 8,
  },
  
  iconWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollcontainer: {
    alignItems: 'center',
    paddingBottom: 120,
  },

  logo: {
    width: 50,
    height: 50,
    marginTop: 6,
    marginBottom: 12,
    resizeMode: 'contain'
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
    color: '#191d23',
  },
  lastUpdated: {
    fontSize: 13,
    color: '#768194',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 18,
    marginBottom: 16,
    elevation: 2, // For Android
    shadowColor: '#353535', // For iOS
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141414',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
    color: '#3d4760',
    marginTop: 2,
    lineHeight: 20,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 18,
    right: 18,
    borderRadius: 30,
    backgroundColor: '#2172f9',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 6
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.3
  },
  
header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 18,
  backgroundColor: "#fff",
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},
headerTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#000",
},
headerSpacer: { width: 24 },

});

export default TermsAndConditions;
