import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Share, Image } from 'react-native';

const ReferralScreen = () => {
  const [referralCode, setReferralCode] = useState('CARSRVC - A8B2C');
  const [invitedFriends, setInvitedFriends] = useState(10);
  const [rewardsEarned, setRewardsEarned] = useState(2);

  // Function to share the referral code via a link
  const onShare = async () => {
    try {
      await Share.share({
        message: `Use my referral code ${referralCode} to get rewards!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Refer a Friend</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.celebrationImageContainer}>
          <Image 
            source={{ uri: 'https://your-image-url.com/celebration.png' }} 
            style={styles.celebrationImage}
          />
        </View>

        <Text style={styles.subtitle}>Invite friends, earn rewards</Text>
        <Text style={styles.description}>
          Share your referral code with friends. When they book their first service, you both get a reward.
        </Text>

        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <TextInput
          style={styles.codeInput}
          value={referralCode}
          editable={false}
        />

        <View style={styles.shareButtonsContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareText}>Share Link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.referralStatus}>
          <Text style={styles.referralStatusText}>Invited</Text>
          <Text style={styles.referralStatusValue}>{invitedFriends} friends</Text>
        </View>

        <View style={styles.referralStatus}>
          <Text style={styles.referralStatusText}>Rewards Earned</Text>
          <Text style={styles.referralStatusValue}>{rewardsEarned} rewards</Text>
        </View>
      </View>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Refer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  celebrationImageContainer: {
    marginBottom: 16,
  },
  celebrationImage: {
    width: 120,
    height: 120,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#555',
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeInput: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  shareButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  shareButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  shareText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  referralStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  referralStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  referralStatusValue: {
    fontSize: 16,
    color: '#555',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default ReferralScreen;
