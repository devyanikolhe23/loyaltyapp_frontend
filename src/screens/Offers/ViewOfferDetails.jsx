import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;
const { width } = Dimensions.get("window");

export default function ViewOfferDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { offer } = route.params;

    const [services, setServices] = useState([]);
    const [countdown, setCountdown] = useState("");

    // ----------------------------------------------------
    // COUNTDOWN TIMER LOGIC
    // ----------------------------------------------------
    useEffect(() => {
        if (!offer.valid_to) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(offer.valid_to).getTime();
            const difference = target - now;

            if (difference <= 0) {
                setCountdown("Offer Expired");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setCountdown(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);


    }, [offer.valid_to]);

    // ----------------------------------------------------
    // FETCH SERVICES WITH TOKEN
    // ----------------------------------------------------
    const fetchServiceDetails = async () => {
        try {
            if (!offer.services || offer.services.length === 0) return;

            const token = await AsyncStorage.getItem("access");
            if (!token) return;

            // If services already contain object → use directly
            if (typeof offer.services[0] === "object" && offer.services[0].title) {
                setServices(offer.services);
                return;
            }

            const ids = offer.services.map((s) =>
                typeof s === "object" ? s.id : s
            );

            const requests = ids.map((id) =>
                axios.get(`${BASE_URL}/api/services/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );

            const responses = await Promise.all(requests);
            setServices(responses.map((res) => res.data));
        } catch (err) {
            console.log("Error fetching services:", err);
            Alert.alert("Error", "Unable to load service details.");
        }


    };

    // Fetch services only when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(fetchServiceDetails, 200);
        }, [offer])
    );

    const handleBookNow = () => {
        navigation.navigate("BookingServiceScreen", {
            offerId: offer.id,
            preselectedServices: services,  // full service objects
            discount: offer.discount_percentage,
            offerTitle: offer.title,
            source: "offer",
            lockedServices: true, // prevent user from changing selection
        });
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {offer.image && (
                <Image
                    source={{ uri: offer.image }}
                    style={styles.image}
                />
            )}

            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.description}>{offer.description}</Text>

            {offer.discount_percentage && (
                <Text style={styles.discount}>
                    Discount: {offer.discount_percentage}%
                </Text>
            )}

            {/* -------------------- VALIDITY + TIMER -------------------- */}
            <View style={styles.timerBox}>
                <Text style={styles.validLabel}>Valid From:</Text>
                <Text style={styles.validValue}>
                    {new Date(offer.valid_from).toLocaleDateString()}
                </Text>

                <Text style={styles.validLabel}>Valid Until:</Text>
                <Text style={styles.validValue}>
                    {new Date(offer.valid_to).toLocaleDateString()}
                </Text>

                <Text style={styles.countdownLabel}>Time Left:</Text>
                <Text style={styles.countdown}>{countdown}</Text>
            </View>

            {/* -------------------- SERVICES -------------------- */}
            {services.length > 0 && (
                <View style={styles.servicesContainer}>
                    <Text style={styles.servicesTitle}>Services Included:</Text>
                    {services.map((service) => (
                        <Text key={service.id} style={styles.serviceItem}>
                            • {service.title}
                        </Text>
                    ))}
                </View>
            )}

            {/* -------------------- BOOK NOW -------------------- */}
            <TouchableOpacity style={styles.bookNow} onPress={handleBookNow}>
                <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
        </ScrollView>


    );
}

// ----------------------------------------------------
// STYLES
// ----------------------------------------------------
const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#fff" },

    image: {
        width: width - 32,
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
    },

    title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
    description: { fontSize: 16, color: "#555", marginBottom: 12 },

    discount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1976D2",
        marginBottom: 12,
    },

    // TIMER BOX STYLES
    timerBox: {
        backgroundColor: "#F3F6FF",
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
    },
    validLabel: { fontSize: 14, color: "#555" },
    validValue: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },

    countdownLabel: { fontSize: 14, color: "#444", marginTop: 8 },
    countdown: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#D9534F",
        marginTop: 4,
    },

    servicesContainer: { marginTop: 16, marginBottom: 20 },
    servicesTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    serviceItem: { fontSize: 16, marginLeft: 8, marginBottom: 4 },

    bookNow: {
        backgroundColor: "#1976D2",
        borderRadius: 8,
        alignItems: "center",
        padding: 15,
        marginTop: 20,
    },
    bookNowText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});