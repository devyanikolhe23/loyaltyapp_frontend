import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import ServiceCard from "../../components/service/ServiceCard";
import axios from "axios";

const BASE_URL = "http://192.168.1.8:8000"; 

const ServiceScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/services/`);
       if (Array.isArray(response.data.results)) {
      setServices(response.data.results);
    } 
    // If backend returns a direct list [...]
    else if (Array.isArray(response.data)) {
      setServices(response.data);
    } 
    else {
      setServices([]); // fallback
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

// import React from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from "../../components/Header";
// import ServiceCard from "../../components/service/ServiceCard";

// const services = [
//   {
//     id: 1,
//     title: "Full Car Wash",
//     description: "Exterior wash, interior vacuum, window cleaning, tire shine.",
//     price: 50,
//     image: require("../../assets/images/full_car_wash.jpg"),
//     tag: "Popular",
//   },
//   {
//     id: 2,
//     title: "Interior Detailing",
//     description: "Deep cleaning of seats, carpets, dashboard, and vents.",
//     price: 80,
//     image: require("../../assets/images/interior_detailing.webp"),
//   },
//   {
//     id: 3,
//     title: "Exterior Polishing",
//     description: "Paint correction, swirl removal, and ceramic coating.",
//     price: 120,
//     image: require("../../assets/images/exterior_polishing.jpg"),
//   },
//   {
//     id: 4,
//     title: "Engine Bay Cleaning",
//     description: "Degreasing and cleaning of the engine compartment.",
//     price: 60,
//     image: require("../../assets/images/engine_bay.webp"),
//   },
// ];

// const ServiceScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Header title="Services" showBack={false} />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {services.map((service) => (
//           <ServiceCard key={service.id} {...service} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ServiceScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F9F9F9" },
//   scrollContainer: { padding: 16 },
// });
