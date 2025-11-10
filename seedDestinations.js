
// seedDestinations.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUpwYlEHw52s8Vimnq2nFwxJVSL3fjwL0",
  authDomain: "global-explorer-travel-app.firebaseapp.com",
  projectId: "global-explorer-travel-app",
  storageBucket: "global-explorer-travel-app.firebasestorage.app",
  messagingSenderId: "846729989547",
  appId: "1:846729989547:web:f840cf98b3e4a52bd816ee",
  measurementId: "G-SYV71X3TZZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const destinations = [
  {
    title: "Bali",
    country: "Indonesia",
    description: "Experience the spiritual calm and tropical beauty of Bali.",
    price: 3500,
    rating: 5,
    image: "https://picsum.photos/seed/bali/800/600",
    coordinates: { lat: -8.4095, lng: 115.1889 },
  },
  {
    title: "Paris",
    country: "France",
    description: "The city of love, art, and the Eiffel Tower.",
    price: 5000,
    rating: 5,
    image: "https://picsum.photos/seed/paris/800/600",
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    title: "Tokyo",
    country: "Japan",
    description: "Where technology meets tradition — explore the vibrant Tokyo.",
    price: 4800,
    rating: 4.8,
    image: "https://picsum.photos/seed/tokyo/800/600",
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    title: "Venice",
    country: "Italy",
    description: "Sail through romantic canals and experience classic Italian beauty.",
    price: 4200,
    rating: 4.7,
    image: "https://picsum.photos/seed/venice/800/600",
    coordinates: { lat: 45.4408, lng: 12.3155 },
  },
  {
    title: "New York",
    country: "United States",
    description: "The city that never sleeps — skyscrapers, art, and endless energy.",
    price: 5500,
    rating: 5,
    image: "https://picsum.photos/seed/newyork/800/600",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    title: "Dubai",
    country: "United Arab Emirates",
    description: "Luxury shopping, modern architecture, and desert adventures.",
    price: 4900,
    rating: 4.9,
    image: "https://picsum.photos/seed/dubai/800/600",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    title: "Hawaii",
    country: "United States",
    description: "Tropical paradise with volcanoes, beaches, and breathtaking views.",
    price: 4600,
    rating: 4.8,
    image: "https://picsum.photos/seed/hawaii/800/600",
    coordinates: { lat: 19.8968, lng: -155.5828 },
  },
  {
    title: "Seoul",
    country: "South Korea",
    description: "A perfect mix of culture, food, and K-pop energy.",
    price: 4000,
    rating: 4.7,
    image: "https://picsum.photos/seed/seoul/800/600",
    coordinates: { lat: 37.5665, lng: 126.978 },
  },
  {
    title: "Phuket",
    country: "Thailand",
    description: "Sun, sea, and smiles — explore Thailand’s most beautiful island.",
    price: 3800,
    rating: 4.8,
    image: "https://picsum.photos/seed/phuket/800/600",
    coordinates: { lat: 7.8804, lng: 98.3923 },
  },
  {
    title: "Cappadocia",
    country: "Turkey",
    description: "Hot air balloons and fairy chimneys in a surreal landscape.",
    price: 3900,
    rating: 4.9,
    image: "https://picsum.photos/seed/cappadocia/800/600",
    coordinates: { lat: 38.6431, lng: 34.8263 },
  },
];

async function seedData() {
  for (const d of destinations) {
    try {
      await addDoc(collection(db, "destinations"), d);
      console.log("✅ Added:", d.title);
    } catch (e) {
      console.error("❌ Error adding", d.title, e);
    }
  }
  console.log("🎉 All destinations added successfully!");
}

seedData();
