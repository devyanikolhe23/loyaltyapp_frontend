import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Mastering the Art of Parallel Parking',
    subtitle: 'Learn the step-by-step process for perfect parallel parking every time.',
    image: require('../../assets/images/carbanner.jpg'), // replace with your asset
    category: 'Driving Tips'
  },
  {
    id: '2',
    title: 'Understanding Your Car’s Warning Lights',
    subtitle: 'A comprehensive guide to deciphering those mysterious symbols on your dashboard.',
    image: require('../../assets/images/engine_bay.webp'),
    category: 'Maintenance Guides'
  },
  {
    id: '3',
    title: 'Maximizing Your MPG',
    subtitle: 'Simple driving habits and maintenance tips to save money at the pump.',
    image: require('../../assets/images/map.webp'),
    category: 'Fuel Efficiency'
  },
  {
    id: '4',
    title: 'Preparing for Winter',
    subtitle: 'Essential steps to ensure your vehicle is ready for cold weather conditions.',
    image: require('../../assets/images/oil_change.jpg'),
    category: 'Seasonal Car Care'
  }
];

const TABS = ['All', 'Articles', 'Videos', 'Infographics'];

const DrivingTipsScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState('All');
  const [search, setSearch] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
       <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={28} color="#222" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Driving Tips</Text>
</View>
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for tips and guides"
            placeholderTextColor="#888"
            style={[styles.searchInput, styles.searchInputFlex]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={styles.tabBtn}>
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
            {selectedTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardsList}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImg} />
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "center",
  },
  backButton: {
    
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    flex: 1,
  },
  scrollContainer: { padding: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 24
  },
  
 
  searchContainer: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 15,
    color: '#181818'
  },
  searchInputFlex: {
    flex: 1,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  searchIcon: {
    marginLeft: 12,
    marginRight: 8
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  tabBtn: {
    paddingVertical: 10,
    marginRight: 22,
    alignItems: 'center'
  },
  tabText: {
    color: '#888',
    fontSize: 15
  },
  tabTextActive: {
    color: '#0080ff',
    fontWeight: 'bold'
  },
  tabUnderline: {
    marginTop: 3,
    width: 20,
    height: 2.5,
    backgroundColor: '#0080ff',
    borderRadius: 1.5
  },
  cardsList: {
    paddingTop: 8,
    paddingBottom: 24
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 13,
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImg: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  cardCategory: {
    fontSize: 13,
    color: '#4991ee',
    marginBottom: 3,
    fontWeight: 'bold'
  },
  cardTitle: {
    fontSize: 17,
    color: '#212121',
    fontWeight: '600',
    marginBottom: 5
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#727272'
  }
});

export default DrivingTipsScreen;
