import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const NotificationSettingsScreen = () => {
  const [settings, setSettings] = useState({
    serviceDue: true,
    appointmentReminders: true,
    specialOffers: false,
    newServices: true,
    serviceProgress: true,
    serviceCompletion: false,
  });

  const toggleSwitch = (key) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Notifications</Text>

        {/* Service Reminders */}
        <Text style={styles.sectionTitle}>Service Reminders</Text>
        <SettingToggle
          title="Service Due"
          description="Get notified when your service is due."
          value={settings.serviceDue}
          onToggle={() => toggleSwitch('serviceDue')}
        />
        <SettingToggle
          title="Appointment Reminders"
          description="Receive reminders for upcoming appointments."
          value={settings.appointmentReminders}
          onToggle={() => toggleSwitch('appointmentReminders')}
        />

        {/* Promotional Alerts */}
        <Text style={styles.sectionTitle}>Promotional Alerts</Text>
        <SettingToggle
          title="Special Offers"
          description="Stay updated on special offers and discounts."
          value={settings.specialOffers}
          onToggle={() => toggleSwitch('specialOffers')}
        />
        <SettingToggle
          title="New Services"
          description="Be the first to know about new services."
          value={settings.newServices}
          onToggle={() => toggleSwitch('newServices')}
        />

        {/* Service Status Updates */}
        <Text style={styles.sectionTitle}>Service Status Updates</Text>
        <SettingToggle
          title="Service Progress"
          description="Get real-time updates on your service progress."
          value={settings.serviceProgress}
          onToggle={() => toggleSwitch('serviceProgress')}
        />
        <SettingToggle
          title="Service Completion"
          description="Receive notifications when your service is completed."
          value={settings.serviceCompletion}
          onToggle={() => toggleSwitch('serviceCompletion')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingToggle = ({ title, description, value, onToggle }) => (
  <View style={styles.settingContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <Switch value={value} onValueChange={onToggle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White theme
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 25,
    marginBottom: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});

export default NotificationSettingsScreen;
