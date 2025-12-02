import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import ServiceCard from "../../components/service/ServiceCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

const ServiceScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/services/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched services response:", response.data);

      if (Array.isArray(response.data.results)) {
        setServices(response.data.results);
      } else if (Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        setServices([]);
      }

    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };


  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#0066FF" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Header title="Services" showBack={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            serviceData={service}
            title={service.title}
            description={service.description}
            price={service.price}
            image={service.image}
            tag={service.is_popular ? "Popular" : null}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContainer: { padding: 16 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

