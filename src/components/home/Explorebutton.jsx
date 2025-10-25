import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const ExploreButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  iconWrapper: {
    marginBottom: 8,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ExploreButton;
