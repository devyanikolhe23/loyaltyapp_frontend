import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import ProfileImagePicker from '../../components/profile/ProfileImagePicker';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEditProfileImage = () => {
    // Add your edit profile picture logic here
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" showBack={false} />
      {/* Header — same as ServiceScreen */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.rightSpacer} /> 
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <ProfileImagePicker
            imageUri="https://via.placeholder.com/150"
            onEditPress={handleEditProfileImage}
          />
          <Text style={styles.name}>Ethan Carter</Text>
          <View style={styles.memberTag}>
            <Text style={styles.memberText}>Premium Member</Text>
          </View>
          <Text style={styles.joinedText}>Joined 2021</Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.item}>
            <Ionicons name="mail-outline" size={20} color="#444" />
            <Text style={styles.itemText}>ethan.carter@email.com</Text>
            <TouchableOpacity>
              <MaterialIcon name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <Ionicons name="call-outline" size={20} color="#444" />
            <Text style={styles.itemText}>+1 (555) 123-4567</Text>
            <TouchableOpacity>
              <MaterialIcon name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <Ionicons name="location-outline" size={20} color="#444" />
            <Text style={styles.itemText}>456 Oak Avenue, Anytown</Text>
            <TouchableOpacity>
              <MaterialIcon name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.item}>
            <Ionicons name="notifications-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ccc', true: '#007bff' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.item}>
            <Ionicons name="language-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Language</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>

          <TouchableOpacity style={styles.item}>
            <FontAwesome5 name="history" size={18} color="#444" />
            <Text style={styles.itemText}>Service History</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('LoyaltyRewardsScreen')}>
            <FontAwesome5 name="medal" size={18} color="#444" />
            <Text style={styles.itemText}>Loyalty Rewards</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}onPress={() => navigation.navigate('ReferFriendScreen')}>
            <Ionicons name="person-add-outline" size={20} color="#444" />
            <Text style={styles.itemText}>Refer a Friend</Text>
            <Entypo name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rightSpacer: {
    width: 24,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },

  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  memberTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },
  memberText: {
    fontSize: 12,
    color: '#333',
  },
  joinedText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    flex: 1,
    marginHorizontal: 10,
    color: '#333',
  },
});

export default ProfileScreen;
