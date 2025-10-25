import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const QuickAction = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: '#eaf3ff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

export default QuickAction;
