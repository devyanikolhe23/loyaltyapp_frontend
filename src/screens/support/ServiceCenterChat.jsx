import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServiceCenterChat = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <View>
            <Text style={styles.headerTitle}>Service Center</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
      </View>

      {/* Chat Section */}
      <ScrollView contentContainerStyle={styles.chatArea}>
        {/* Message 1 - Service Center */}
        <View style={styles.messageRowLeft}>
          <View style={styles.iconBubble}>
            <Ionicons name="construct-outline" size={20} color="#0f5132" />
          </View>
          <View style={styles.msgLeft}>
            <Text style={styles.msgText}>
              Hello, Alex! We've received your request for a full car service.
              Could you please provide the make and model of your vehicle so we
              can tailor the service to your specific needs?
            </Text>
            <Text style={styles.timeText}>10:00 AM</Text>
          </View>
        </View>

        {/* Message 2 - User */}
        <View style={styles.messageRowRight}>
          <View style={styles.msgRight}>
            <Text style={styles.msgRightText}>
              Hi! It’s a 2018 Honda Civic. Looking forward to getting it serviced.
            </Text>
            <Text style={[styles.timeText, { color: '#dce6ff', textAlign: 'right' }]}>
              10:01 AM
            </Text>
          </View>
          <View style={styles.iconBubbleUser}>
            <Ionicons name="person-circle-outline" size={30} color="#555" />
          </View>
        </View>

        {/* Message 3 - Service Center */}
        <View style={styles.messageRowLeft}>
          <View style={styles.iconBubble}>
            <Ionicons name="construct-outline" size={20} color="#0f5132" />
          </View>
          <View style={styles.msgLeft}>
            <Text style={styles.msgText}>
              Great, Alex! We'll prepare a detailed service plan for your Honda
              Civic. In the meantime, is there anything specific you'd like us to
              focus on during the service?
            </Text>
            <Text style={styles.timeText}>10:02 AM</Text>
          </View>
        </View>
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type your message..."
          placeholderTextColor="#777"
          style={styles.input}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="attach-outline" size={22} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="car-outline" size={22} color="#333" />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#333" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#007bff" />
          <Text style={[styles.navText, { color: '#007bff', fontWeight: '600' }]}>
            Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#333" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCenterChat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  headerStatus: { fontSize: 13, color: 'green' },

  chatArea: { padding: 15 },
  messageRowLeft: { flexDirection: 'row', marginTop: 12 },
  messageRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eaf6ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleUser: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  msgLeft: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginLeft: 8,
    maxWidth: '75%',
  },
  msgRight: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 15,
    borderTopRightRadius: 0,
    maxWidth: '75%',
  },
  msgText: { color: '#333', fontSize: 14, lineHeight: 20 },
  msgRightText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  timeText: { fontSize: 11, color: '#aaa', marginTop: 4 },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: '#000',
  },
  iconButton: { marginLeft: 10 },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: 6,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, color: '#333', marginTop: 2 },
});
