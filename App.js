
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocalizationProvider, useI18n } from './src/context/Localization';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingScreen from './screens/BookingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Booking' }} />
    </Stack.Navigator>
  );
};

const ExploreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ExploreMain" component={ExploreScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
    <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Booking' }} />
  </Stack.Navigator>
);

const TabsInner = () => {
  const { t } = useI18n();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fbc531',
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="map-search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <LocalizationProvider>
      <NavigationContainer>
        <TabsInner />
      </NavigationContainer>
    </LocalizationProvider>
  );
}
