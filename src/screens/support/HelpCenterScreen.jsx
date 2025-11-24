import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header'; // your reusable Header

const HelpCenter = ({ navigation }) => {
  const [expanded, setExpanded] = useState('book');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header with back button */}
        <Header
          title="Help Center"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Popular Topics */}
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <View style={styles.topicsGrid}>
            <TopicBox
              icon="car"
              label="My Bookings"
              onPress={() =>
                navigation.navigate('BookingStack', { screen: 'MyBookingsScreen' })
              }
            />


            <TopicBox
              icon="location"
              label="Locations"
              onPress={() => navigation.navigate('LocationsScreen')} // replace with actual screen
            />
            <TopicBox
              icon="card"
              label="Payment"
              onPress={() => navigation.navigate('PaymentScreen')} // replace with actual screen
            />
            <TopicBox
              icon="help-circle"
              label="Other"
              onPress={() => navigation.navigate('OtherScreen')} // replace with actual screen
            />
          </View>

          {/* FAQ */}
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <FAQ
            title="How do I book a car?"
            content="To book a car, simply select your desired dates, location, and car type. Follow the prompts to complete your booking."
            expanded={expanded === 'book'}
            onPress={() => setExpanded(expanded === 'book' ? null : 'book')}
          />
          <FAQ
            title="What are the payment options?"
            content="We accept all major credit cards, debit cards, and selected digital wallets."
            expanded={expanded === 'payment'}
            onPress={() => setExpanded(expanded === 'payment' ? null : 'payment')}
          />
          <FAQ
            title="How do I cancel my booking?"
            content="Go to your bookings, select the reservation, and choose 'Cancel Booking'."
            expanded={expanded === 'cancel'}
            onPress={() => setExpanded(expanded === 'cancel' ? null : 'cancel')}
          />

          {/* Help Buttons */}
          <View style={styles.helpContainer}>
            <Text style={styles.stillNeedHelp}>Still need help?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.outlinedButton}
                onPress={() => navigation.navigate('EmailUsScreen')} // change to EmailUsScreen or ChatWithUs
              >
                <Icon name="mail-outline" size={18} color="#000" />
                <Text style={styles.outlinedButtonText}>Contact Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filledButton}
                onPress={() => navigation.navigate('SupportChatScreen')}
              >
                <Icon name="chatbox-ellipses-outline" size={18} color="#fff" />
                <Text style={styles.filledButtonText}>Chat with Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Updated TopicBox to accept onPress
const TopicBox = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.topicBox} onPress={onPress}>
    <Icon name={icon} size={24} color="#007AFF" />
    <Text style={styles.topicLabel}>{label}</Text>
  </TouchableOpacity>
);

// FAQ Component
const FAQ = ({ title, content, expanded, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.faqBox}>
    <Text style={styles.faqTitle}>{title}</Text>
    {expanded && <Text style={styles.faqContent}>{content}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#000', marginVertical: 10 },
  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  topicBox: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  topicLabel: { marginTop: 10, fontSize: 14, fontWeight: '500', color: '#000' },
  faqBox: { paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee' },
  faqTitle: { fontSize: 16, fontWeight: '500', color: '#000' },
  faqContent: { marginTop: 8, color: '#555', fontSize: 14 },
  helpContainer: { marginTop: 20, alignItems: 'center' },
  stillNeedHelp: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  outlinedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  outlinedButtonText: { marginLeft: 8, fontWeight: '500', color: '#000' },
  filledButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filledButtonText: { marginLeft: 8, fontWeight: '500', color: '#fff' },
});

export default HelpCenter;
