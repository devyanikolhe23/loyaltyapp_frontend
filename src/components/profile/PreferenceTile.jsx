import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/color';
import textStyles from '../../utils/textStyles';

export default function PreferenceTile({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'boolean' ? (
        <Switch value={value} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: colors.tile,
    padding: 12,
    borderRadius: 8,
  },
  label: {
    ...textStyles.body,
    color: colors.textSecondary,
  },
  value: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
});
