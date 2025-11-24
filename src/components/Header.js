import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function Header({ title, showBack }) {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.header}>
      {/* Left Side Icon */}
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleDrawer} style={styles.iconBtn}>
          <Icon name="menu" size={24} color="#222" />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Notification Icon → shown only when not showing back arrow */}
      {!showBack ? (
        <TouchableOpacity onPress={() => navigation.navigate("NotificationSettingsScreen")}>
          <Icon name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} /> // placeholder for spacing balance
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    elevation: 2,
  },
  iconBtn: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
