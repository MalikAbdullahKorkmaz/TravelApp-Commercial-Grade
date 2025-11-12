import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useI18n } from '../src/context/Localization';
import { getDestinationId, getHotelsByDestination } from '../src/services/travelApi';
import HotelMap from '../components/HotelMap';
import { mockCarData } from '../seedDestinations'; // Mock car data
import { db } from '../src/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function DetailsScreen({ route, navigation }) {
  const { destination } = route.params || {};
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState(mockCarData); // Use mock data for cars for now
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!destination || !destination.title) {
        setLoading(false);
        return;
      }
      try {
        // 1. Attempt to get Hotels from API
        const destId = await getDestinationId(destination.title);
        let apiHotels = [];

        if (destId) {
          apiHotels = await getHotelsByDestination(destId);
        } else {
          console.warn(`Could not find destination ID for ${destination.title}. Falling back to mock data.`);
        }

        // 2. Fallback to Firebase mock data if API fails or returns empty
        if (apiHotels.length === 0) {
          const hotelsQuery = query(collection(db, 'hotels'), where('destinationId', '==', destination.id));
          const hotelsSnapshot = await getDocs(hotelsQuery);
          const hotelsData = hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHotels(hotelsData);
        } else {
          setHotels(apiHotels);
        }

      } catch (error) {
        console.error("Error fetching hotel data:", error);
        // Ensure loading is set to false even on error
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchHotelData();
  }, [destination]);

  const handleHotelSelect = (hotel) => {
    navigation.navigate('Booking', { type: 'Hotel', item: hotel, destination: destination });
  };

  const handleCarSelect = (car) => {
    navigation.navigate('Booking', { type: 'Car', item: car, destination: destination });
  };

  if (!destination) return <SafeAreaView><Text>No data</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Destination Header */}
        <Image source={destination.image} style={styles.image} />
        <Text style={styles.title}>{destination.title}</Text>
        <Text style={styles.country}>{t('country')}: {destination.country}</Text>
        <Text style={styles.price}>Avg. Price: ${destination.price}</Text>
        <Text style={styles.rating}>Rating: {destination.rating}</Text>
        <Text style={styles.descLabel}>{t('description')}</Text>
        <Text style={styles.desc}>{destination.description}</Text>

        {/* HOTEL SECTION */}
        <Text style={styles.sectionTitle}>Hotels in {destination.title}</Text>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Searching for the best hotels...</Text>
          </View>
        ) : hotels.length > 0 ? (
          <>
            {/* Hotel Map */}
            <HotelMap hotels={hotels} destination={destination} />

            {/* Hotel List */}
            {hotels.map((hotel, index) => (
              <View key={hotel.id || index} style={styles.card}>
                <Image source={{ uri: hotel.image || 'https://via.placeholder.com/150' }} style={styles.hotelImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <Text style={styles.hotelPrice}>${Math.round(hotel.price)} {hotel.currency || 'USD'} / night</Text>
                  <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons name="star" size={16} color="#f39c12" />
                    <Text style={styles.hotelRating}>{hotel.rating} ({hotel.reviewCount || '0'} reviews)</Text>
                  </View>
                  <Text style={styles.hotelFeatures}>{hotel.features ? hotel.features.slice(0, 3).join(' • ') : 'No features listed'}</Text>
                  <TouchableOpacity style={styles.selectButton} onPress={() => handleHotelSelect(hotel)}>
                    <Text style={styles.selectButtonText}>Select Hotel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noDataText}>No hotels found for this destination.</Text>
        )}

        {/* CAR RENTAL SECTION (Using mock data for now) */}
        <Text style={styles.sectionTitle}>Car Rentals</Text>
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <View key={index} style={styles.card}>
              <Image source={car.image} style={styles.carImage} />
              <View style={styles.cardContent}>
                <Text style={styles.carModel}>{car.model}</Text>
                <Text style={styles.carPrice}>${car.dailyRateUSD} / day</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => handleCarSelect(car)}>
                  <Text style={styles.selectButtonText}>Select Car</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No cars available for rental.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50, // Extra space for scroll
  },
  image:{ width:'100%', height:220, borderRadius:12 },
  title:{ marginTop:12, fontSize:22, fontWeight:'800' },
  country:{ marginTop:6, color:'#666' },
  price:{ marginTop:6, fontWeight:'700', color:'#27ae60' },
  rating:{ marginTop:4, color:'#f39c12' },
  descLabel:{ marginTop:12, fontWeight:'700' },
  desc:{ marginTop:6, lineHeight:20, color:'#333' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  hotelImage: {
    width: 120,
    height: 150,
    resizeMode: 'cover',
  },
  carImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  hotelPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  hotelRating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#f39c12',
  },
  hotelFeatures: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  carModel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  carPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 4,
  },
  selectButton: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
  center: { 
    alignItems: 'center', 
    paddingVertical: 40 
  },
});
