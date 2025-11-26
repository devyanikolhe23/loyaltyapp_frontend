import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header"; // import the reusable Header

const SupportChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");

  const [chatData, setChatData] = useState([
    {
      id: 1,
      message:
        "Hello! We've received your request for a full service. Could you please provide the make and model of your vehicle?",
      time: "10:00 AM",
      sender: "service",
    },
    {
      id: 2,
      message: "Hi! It’s a 2018 Honda Civic. Looking forward to getting it serviced.",
      time: "10:01 AM",
      sender: "user",
    },
    {
      id: 3,
      message:
        "Great! We'll prepare a detailed service plan. Is there anything specific you'd like us to focus on?",
      time: "10:02 AM",
      sender: "service",
    },
  ]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      message,
      time: "Now",
      sender: "user",
    };

    setChatData([...chatData, newMessage]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      {/* Reusable Header */}
      <Header
        title="Service Center"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Chat Messages */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        style={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "user" ? styles.userMessage : styles.serviceMessage,
            ]}
          >
            {item.sender === "service" && (
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
                style={styles.avatar}
              />
            )}

            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            {item.sender === "user" && (
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" }}
                style={styles.avatar}
              />
            )}
          </View>
        )}
      />

      {/* Input Box */}
      <View style={styles.inputArea}>
        <TextInput
          placeholder="Type your message..."
          placeholderTextColor="#8D8D8D"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <Ionicons name="attach" size={24} color="#8D8D8D" style={{ marginHorizontal: 8 }} />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Ionicons name="paper-plane" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupportChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // Chat styles
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 8,
  },
  avatar: { width: 34, height: 34, borderRadius: 50 },
  serviceMessage: { justifyContent: "flex-start" },
  userMessage: { flexDirection: "row-reverse" },
  messageBubble: {
    maxWidth: "75%",
    padding: 13,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageText: { color: "#000", fontSize: 15, lineHeight: 20 },
  timeText: { color: "#A1A1A1", fontSize: 11, marginTop: 4 },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 16,
    height: 45,
    color: "#000",
  },
  sendBtn: {
    backgroundColor: "#007BFF",
    width: 43,
    height: 43,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
});
