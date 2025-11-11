import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const defaultProfileImage = require('../../assets/images/profile.jpg');

export default function ProfileImagePicker({ uri, onImageUpdate }) {
  const handleEditPress = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Upload', onPress: pickImage },
        { text: 'Delete', onPress: handleDelete },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    const result = await launchImageLibrary(options);
    if (result.didCancel) return;
    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      onImageUpdate(selectedImage.uri); // return image URI to parent
    }
  };

  const handleDelete = () => {
    onImageUpdate(null);
    Alert.alert('Profile image removed');
  };

  return (
    <View style={styles.container}>
      <Image
        source={uri ? { uri } : defaultProfileImage}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
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
