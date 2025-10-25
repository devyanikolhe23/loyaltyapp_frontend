import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomBar = ({ state, descriptors, navigation }) => {
  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Services', icon: 'car-outline' },
    { name: 'Bookings', icon: 'calendar-outline' },
    { name: 'Support', icon: 'help-circle-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[index].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={onPress}
            accessibilityRole="button"
          >
            <Icon
              name={tab.icon}
              size={22}
              color={isFocused ? '#2B70F7' : '#444'}
            />
            <Text style={isFocused ? styles.navTextActive : styles.navText}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: '#2B70F7',
    fontWeight: '400',
    marginTop: 2,
  },
});

export default BottomBar;
