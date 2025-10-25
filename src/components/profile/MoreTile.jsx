import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/color';
import textStyles from '../../utils/textStyles';

export default function MoreTile({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: colors.tile,
    padding: 12,
    borderRadius: 8,
  },
  label: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
});
