import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpCenter = () => {
  const [expanded, setExpanded] = useState('book');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Main Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Help Center</Text>
          </View>

          {/* Search */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help"
            placeholderTextColor="#999"
          />

          {/* Popular Topics */}
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <View style={styles.topicsGrid}>
            <TopicBox icon="car" label="My Bookings" />
            <TopicBox icon="location" label="Locations" />
            <TopicBox icon="card" label="Payment" />
            <TopicBox icon="help-circle" label="Other" />
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
              <TouchableOpacity style={styles.outlinedButton}>
                <Icon name="mail-outline" size={18} color="#000" />
                <Text style={styles.outlinedButtonText}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filledButton}>
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

const TopicBox = ({ icon, label }) => (
  <TouchableOpacity style={styles.topicBox}>
    <Icon name={icon} size={24} color="#007AFF" />
    <Text style={styles.topicLabel}>{label}</Text>
  </TouchableOpacity>
);

const FAQ = ({ title, content, expanded, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.faqBox}>
    <Text style={styles.faqTitle}>{title}</Text>
    {expanded && <Text style={styles.faqContent}>{content}</Text>}
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 16,
    color: '#000',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginVertical: 10,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicBox: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  topicLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  faqBox: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  faqContent: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
  },
  helpContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  stillNeedHelp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
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
  outlinedButtonText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#000',
  },
  filledButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filledButtonText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  bottomTab: {
    alignItems: 'center',
    flex: 1,
  },
  bottomTabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
});

export default HelpCenter;