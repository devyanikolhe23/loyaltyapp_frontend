import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';

const ReferralProgramScreen = () => {
  const referralCode = "C4R53RV1C3";

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert("Copied", "Referral code copied to clipboard!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Referral Program</Text>

        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        <Text style={styles.title}>Refer a friend, earn rewards</Text>
        <Text style={styles.subtitle}>
          Invite friends to experience our service and earn rewards for each successful referral.
        </Text>

        {/* Referral Code */}
        <Text style={styles.sectionTitle}>Your Referral Code</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Icon name="copy-outline" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Referral Activity */}
        <Text style={styles.sectionTitle}>Referral Activity</Text>
        <View style={styles.infoBox}>
          <Icon name="mail-outline" size={20} color="#333" />
          <Text style={styles.infoText}>Invitations Sent: 5</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="time-outline" size={20} color="#333" />
          <Text style={styles.infoText}>Pending Referrals: 3</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="checkmark-circle-outline" size={20} color="#333" />
          <Text style={styles.infoText}>Successful Referrals: 2</Text>
        </View>

        {/* Rewards Earned */}
        <Text style={styles.sectionTitle}>Rewards Earned</Text>
        <View style={styles.infoBox}>
          <Icon name="cash-outline" size={20} color="#333" />
          <Text style={styles.infoText}>Total Earnings: $50</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="car-outline" size={20} color="#333" />
          <Text style={styles.infoText}>Free Car Washes: 2</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Static for Demo) */}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={24} color="#666" />
        <Icon name="car-outline" size={24} color="#666" />
        <Icon name="calendar-outline" size={24} color="#666" />
        <Icon name="help-circle-outline" size={24} color="#666" />
        <Icon name="person-outline" size={24} color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  codeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#444',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default ReferralProgramScreen;
