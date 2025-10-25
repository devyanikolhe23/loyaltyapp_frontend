// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// export default function CustomSidebar({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Menu</Text>
//       <TouchableOpacity
//         style={styles.item}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Icon name="home" size={20} />
//         <Text style={styles.text}>Home</Text>
//       </TouchableOpacity>
//       {/* Add other items */}
//       <TouchableOpacity style={styles.item}>
//         <Icon name="settings" size={20} />
//         <Text style={styles.text}>Settings</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.item}>
//         <Icon name="log-out" size={20} />
//         <Text style={styles.text}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15
//   },
//   text: {
//     marginLeft: 10,
//     fontSize: 16
//   }
// });