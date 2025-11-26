import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FeedbackForm = () => {
  const [overallExperience, setOverallExperience] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [review, setReview] = useState('');

  const renderStars = (rating, setter) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setter(i)}
        >
          <FontAwesome
            name={i <= rating ? 'star' : 'star-o'}
            size={30}
            color="#FFA500"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Feedback Submitted:', { overallExperience, punctuality, serviceQuality, communication, review });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/your-avatar-image-url' }} // Update with your avatar URL
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Service Completed</Text>
        <Text style={styles.subHeader}>Your feedback is valuable to us.</Text>
      </View>

      <Text style={styles.question}>How was your overall experience?</Text>
      <View style={styles.starsContainer}>
        {renderStars(overallExperience, setOverallExperience)}
      </View>

      <Text style={styles.subHeader}>Rate specific aspects</Text>

      <Text style={styles.question}>Punctuality</Text>
      <View style={styles.starsContainer}>
        {renderStars(punctuality, setPunctuality)}
      </View>

      <Text style={styles.question}>Service Quality</Text>
      <View style={styles.starsContainer}>
        {renderStars(serviceQuality, setServiceQuality)}
      </View>

      <Text style={styles.question}>Communication</Text>
      <View style={styles.starsContainer}>
        {renderStars(communication, setCommunication)}
      </View>

      <Text style={styles.question}>Write a review</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Share your experience..."
        multiline
        value={review}
        onChangeText={setReview}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackForm;