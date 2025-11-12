
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useI18n } from '../src/context/Localization';
import { getAuth } from 'firebase/auth';
import { db } from '../src/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'es', label: 'Español' },
  { code: 'id', label: 'Indonesia' },
  { code: 'zh', label: '中文' },
];

export default function ProfileScreen({ navigation }) {
  const { t, lang, setLang } = useI18n();
  const auth = getAuth();
  const user = auth.currentUser;
  const [bookings, setBookings] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Bookings
        const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const bookingsData = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);

        // Fetch Favorites (Destinations)
        const favoritesQuery = query(collection(db, 'users', user.uid, 'favorites'));
        const favoritesSnapshot = await getDocs(favoritesQuery);
        const favoriteIds = favoritesSnapshot.docs.map(doc => doc.id);
        
        // Fetch full destination data for favorites
        const favoriteDestinations = [];
        for (const id of favoriteIds) {
          // Assuming destination data is stored in the favorites subcollection for simplicity
          // In a real app, we would fetch from the main 'destinations' collection
          favoriteDestinations.push(favoritesSnapshot.docs.find(doc => doc.id === id).data());
        }
        setFavorites(favoriteDestinations);

      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login'); // Navigate back to the login screen (handled by RootNavigator) (handled by RootNavigator)
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.noUserText}>Please log in to view your profile.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

	  return (
	    <SafeAreaView style={styles.safe}>
	      <ScrollView contentContainerStyle={styles.container}>
	        <Text style={styles.title}>{t('profile')}</Text>

	        {/* User Info Section */}
	        <View style={styles.userInfoContainer}>
          <MaterialCommunityIcons name="account-circle" size={60} color="#FF6B6B" />
          <Text style={styles.userName}>{user.displayName || 'Traveler'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
		          <Text style={styles.userSince}>Member since: {new Date(user.metadata.creationTime).toLocaleDateString()}</Text>
	        </View>

	        {/* Bookings Section */}
	        <Text style={styles.sectionTitle}>My Bookings ({bookings.length})</Text>
	        {bookings.length > 0 ? (
	          bookings.map((booking, index) => (
	            <View key={index} style={styles.bookingCard}>
	              <Text style={styles.bookingItem}>{booking.itemName} ({booking.bookingType})</Text>
	              <Text style={styles.bookingDestination}>Destination: {booking.destination}</Text>
	              <Text style={styles.bookingPrice}>Price: ${booking.price}</Text>
	              <Text style={styles.bookingStatus}>Status: {booking.status}</Text>
	            </View>
	          ))
	        ) : (
	          <Text style={styles.noDataText}>No active bookings found.</Text>
	        )}

		        {/* Settings Link */}
		        <Text style={styles.sectionTitle}>Settings</Text>
		        <TouchableOpacity style={styles.settingLink} onPress={() => navigation.navigate('Settings')}>
		          <MaterialCommunityIcons name="cog" size={24} color="#333" />
		          <Text style={styles.settingLinkText}>App Settings</Text>
		          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
		        </TouchableOpacity>

		        {/* Favorites Section */}
	        <Text style={styles.sectionTitle}>My Favorites ({favorites.length})</Text>
	        {favorites.length > 0 ? (
	          favorites.map((fav, index) => (
	            <View key={index} style={styles.favoriteCard}>
	              <Text style={styles.favoriteTitle}>{fav.title}</Text>
	              <Text style={styles.favoriteCountry}>{fav.country}</Text>
	            </View>
	          ))
	        ) : (
	          <Text style={styles.noDataText}>No favorite destinations added yet.</Text>
	        )}

	        {/* Language Selection Section */}
	        <Text style={styles.sectionTitle}>{t('selectLanguage')}</Text>
	        {languages.map(l => (
	          <TouchableOpacity
	            key={l.code}
	            style={[styles.btn, lang === l.code && styles.btnActive]}
	            onPress={() => setLang(l.code)}
	          >
	            <Text style={[styles.btnText, lang===l.code && styles.btnTextActive]}>{l.label}</Text>
	          </TouchableOpacity>
	        ))}

	        {/* Logout Button */}
	        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
	          <Text style={styles.logoutButtonText}>Logout</Text>
	        </TouchableOpacity>
	      </ScrollView>
	    </SafeAreaView>
	  );
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#fff' },
  container:{ padding:16 },
  title:{ fontSize:22, fontWeight:'800' },
  subtitle:{ marginTop:12, color:'#666', marginBottom:8 },
  btn:{ padding:12, borderWidth:1, borderColor:'#eee', borderRadius:8, marginVertical:6 },
  btnActive:{ backgroundColor:'#fbc53122', borderColor:'#fbc531' },
  btnText:{ fontWeight:'600' },
  btnTextActive:{ color:'#b57f00' },
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
  noUserText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  userInfoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
  userSince: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  bookingItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bookingDestination: {
    fontSize: 14,
    color: '#666',
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B6B',
    marginTop: 5,
  },
  bookingStatus: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '700',
  },
  favoriteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  favoriteCountry: {
    fontSize: 14,
    color: '#666',
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
	  logoutButtonText: {
	    color: '#fff',
	    fontSize: 16,
	    fontWeight: '700',
	  },
	  settingLink: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'space-between',
	    paddingVertical: 15,
	    borderBottomWidth: 1,
	    borderBottomColor: '#eee',
	  },
	  settingLinkText: {
	    flex: 1,
	    fontSize: 16,
	    marginLeft: 15,
	    color: '#333',
	  }
	});
