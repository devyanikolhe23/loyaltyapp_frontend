import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/color';
import textStyles from '../../utils/textStyles';

export default function AccountTile({ icon, label, value, editable }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.value}>{value}</Text>
        {editable && (
          <TouchableOpacity>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  edit: {
    marginLeft: 8,
    color: colors.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
