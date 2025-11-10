
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/services/firebase';
import DestinationCard from '../components/DestinationCard';
import { useI18n } from '../src/context/Localization';

export default function ExploreScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'destinations'));
      const d = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(d);
    })();
  }, []);

  const filtered = data.filter(d => (d.title + ' ' + d.country).toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('explore')}</Text>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <DestinationCard destination={item} onPress={(d)=>navigation.navigate('Details',{ destination: d })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#fff' },
  header:{ padding:16 },
  title:{ fontSize:22, fontWeight:'800' },
  input:{ marginTop:12, borderWidth:1, borderColor:'#eee', borderRadius:8, padding:10 }
});
