import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import DestinationCard from '../components/DestinationCard';
import { useI18n } from '../src/context/Localization';
import { destinations } from '../seedDestinations'; // Import local data

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  // Simulate data loading for a better user experience
  useEffect(() => {
    // In a real app, this would be fetching from a remote API.
    // Since we are using local data, we simulate the loading state.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate a short network delay

    return () => clearTimeout(timer);
  }, []);

  const handlePress = (destination) => navigation.navigate('Details', { destination });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Travel App</Text>
        <Text style={styles.subtitle}>{t('popular')}</Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 8 }}>Loading...</Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {destinations.map((d, index) => (
              <DestinationCard key={index} destination={d} onPress={handlePress} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { marginTop: 8, fontSize: 16, fontWeight: '600', color: '#666' },
  center: { alignItems: 'center', paddingVertical: 40 },
});
