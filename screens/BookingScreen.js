import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../src/services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const BookingScreen = ({ route, navigation }) => {
  const { type, item, destination } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to complete your booking.');
      navigation.navigate('Login');
      return;
    }

    if (!fullName || !phone) {
      Alert.alert('Missing Information', 'Please fill in your full name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        fullName: fullName,
        phone: phone,
        bookingType: type,
        destination: destination.title,
        itemId: item.id,
        itemName: item.name || item.model,
        price: item.price || item.dailyRateUSD,
        bookingDate: new Date().toISOString(),
        status: 'Pending',
      };

      await addDoc(collection(db, 'bookings'), bookingData);

      Alert.alert('Booking Successful!', `Your ${type} booking for ${bookingData.itemName} in ${destination.title} has been placed. You can view it in your profile.`);
      navigation.popToTop(); // Go back to the home screen
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Booking Failed', 'An error occurred while processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItemDetails = () => {
    if (type === 'Hotel') {
      return (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Hotel Booking Details</Text>
          <Text style={styles.detailText}>Hotel: {item.name}</Text>
          <Text style={styles.detailText}>Destination: {destination.title}</Text>
          <Text style={styles.detailPrice}>Price: ${item.price} / night</Text>
          <Text style={styles.detailText}>Rating: {item.rating} Stars</Text>
        </View>
      );
    } else if (type === 'Car') {
      return (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Car Rental Details</Text>
          <Text style={styles.detailText}>Model: {item.model}</Text>
          <Text style={styles.detailText}>Type: {item.type}</Text>
          <Text style={styles.detailPrice}>Rate: ${item.dailyRateUSD} / day</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Complete Your {type} Booking</Text>
        
        {renderItemDetails()}

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Personal Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false} // Email is taken from auth
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity 
          style={[styles.bookButton, isSubmitting && styles.bookButtonDisabled]} 
          onPress={handleBooking}
          disabled={isSubmitting}
        >
          <Text style={styles.bookButtonText}>
            {isSubmitting ? 'Processing...' : `Book ${type} Now`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#FF6B6B',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#FF6B6B80',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default BookingScreen;
