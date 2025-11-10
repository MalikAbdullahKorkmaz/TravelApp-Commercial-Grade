
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/services/firebase';
import DestinationCard from '../components/DestinationCard';
import { useI18n } from '../src/context/Localization';

export default function HomeScreen({ navigation }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, 'destinations'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDestinations(data);
      } catch (e) {
        console.error('Firestore error', e);
      } finally {
        setLoading(false);
      }
    })();
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
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} onPress={handlePress} />
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
