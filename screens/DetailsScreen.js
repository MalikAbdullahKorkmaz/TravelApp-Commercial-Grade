
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useI18n } from '../src/context/Localization';
import { db } from '../src/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetailsScreen({ route, navigation }) {
  const { destination } = route.params || {};
  const [hotels, setHotels] = React.useState([]);
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { t } = useI18n();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!destination || !destination.id) {
        setLoading(false);
        return;
      }
      try {
        // Fetch Hotels
        const hotelsQuery = query(collection(db, 'hotels'), where('destinationId', '==', destination.id));
        const hotelsSnapshot = await getDocs(hotelsQuery);
        const hotelsData = hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHotels(hotelsData);

        // Fetch Cars (assuming cars are general and not destination-specific for simplicity)
        const carsQuery = query(collection(db, 'cars'));
        const carsSnapshot = await getDocs(carsQuery);
        const carsData = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCars(carsData);

      } catch (error) {
        console.error("Error fetching hotel/car data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [destination]);

  const handleHotelSelect = (hotel) => {
    navigation.navigate('Booking', { type: 'Hotel', item: hotel, destination: destination });
  };

  const handleCarSelect = (car) => {
    navigation.navigate('Booking', { type: 'Car', item: car, destination: destination });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  if (!destination) return <SafeAreaView><Text>No data</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <Text style={styles.title}>{destination.title}</Text>
        <Text style={styles.country}>{t('country')}: {destination.country}</Text>
        <Text style={styles.price}>{t('price')}: ${destination.price}</Text>
        <Text style={styles.rating}>{t('rating')}: {destination.rating}</Text>
        <Text style={styles.descLabel}>{t('description')}</Text>
        <Text style={styles.desc}>{destination.description}</Text>

        {/* HOTEL SECTION */}
        <Text style={styles.sectionTitle}>Hotels in {destination.title}</Text>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: hotel.imageUrl }} style={styles.hotelImage} />
              <View style={styles.cardContent}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <Text style={styles.hotelPrice}>${hotel.price} / night</Text>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons name="star" size={16} color="#f39c12" />
                  <Text style={styles.hotelRating}>{hotel.rating}</Text>
                </View>
                <Text style={styles.hotelFeatures}>{hotel.features.join(' • ')}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => handleHotelSelect(hotel)}>
                  <Text style={styles.selectButtonText}>Select Hotel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No hotels found for this destination.</Text>
        )}

        {/* CAR RENTAL SECTION */}
        <Text style={styles.sectionTitle}>Car Rentals</Text>
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
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
  }
});
