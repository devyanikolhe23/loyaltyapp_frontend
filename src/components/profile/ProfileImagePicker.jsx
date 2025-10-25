import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const defaultProfileImage = require('../../assets/images/profile.jpg');

export default function ProfileImagePicker({ uri, onEditPress }) {
  return (
    <View style={styles.container}>
      <Image
        source={uri ? { uri } : defaultProfileImage}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
        <Icon name="pencil" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 60 },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#007bff', padding: 6, borderRadius: 50 },
});
