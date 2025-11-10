// This file contains the mock data structure for Firebase Firestore.
// The user needs to manually upload this data to their Firebase project.

// 1. DESTINATION DATA (Updated with real-world image URLs)
const destinations = [
  {
    id: "dubai",
    title: "Dubai",
    country: "United Arab Emirates",
    image: "https://i.imgur.com/your-dubai-image-url.jpeg", // Placeholder for user's uploaded image
    rating: 4.9,
    price: 5500,
    description: "A global city known for luxury shopping, ultramodern architecture and a lively nightlife scene.",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    id: "singapore",
    title: "Singapore",
    country: "Singapore",
    image: "https://i.imgur.com/your-singapore-image-url.jpeg", // Placeholder for user's uploaded image
    rating: 4.7,
    price: 4200,
    description: "A global financial center with a tropical climate and multicultural population.",
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  {
    id: "alps",
    title: "Swiss Alps",
    country: "Switzerland",
    image: "https://i.imgur.com/your-alps-image-url.jpeg", // Placeholder for user's uploaded image
    rating: 5.0,
    price: 6800,
    description: "Majestic mountains, pristine lakes, and charming villages perfect for hiking and skiing.",
    coordinates: { lat: 46.8182, lng: 8.2275 },
  },
  {
    id: "shanghai",
    title: "Shanghai",
    country: "China",
    image: "https://i.imgur.com/your-shanghai-image-url.jpeg", // Placeholder for user's uploaded image
    rating: 4.5,
    price: 3900,
    description: "The global financial hub and a city of contrasts, blending traditional culture with modern skyscrapers.",
    coordinates: { lat: 31.2304, lng: 121.4737 },
  },
];

// 2. HOTEL DATA (Mock data for each destination)
const hotels = [
  // Hotels for Dubai
  {
    destinationId: "dubai",
    name: "Burj Al Arab Jumeirah",
    price: 1200, // USD per night
    rating: 5.0,
    features: ["Private Beach", "24/7 Butler Service", "Infinity Pool"],
    location: { lat: 25.1414, lng: 55.1852 },
    imageUrl: "https://i.imgur.com/hotel-burjalarab.jpeg",
  },
  {
    destinationId: "dubai",
    name: "Atlantis, The Palm",
    price: 750,
    rating: 4.6,
    features: ["Waterpark Access", "Aquarium View", "Spa"],
    location: { lat: 25.1306, lng: 55.1652 },
    imageUrl: "https://i.imgur.com/hotel-atlantis.jpeg",
  },
  // Hotels for Singapore
  {
    destinationId: "singapore",
    name: "Marina Bay Sands",
    price: 950,
    rating: 4.8,
    features: ["Rooftop Infinity Pool", "Casino", "Shopping Mall"],
    location: { lat: 1.2816, lng: 103.8617 },
    imageUrl: "https://i.imgur.com/hotel-mbs.jpeg",
  },
  {
    destinationId: "singapore",
    name: "The Fullerton Hotel",
    price: 450,
    rating: 4.5,
    features: ["Historic Building", "River View", "Fine Dining"],
    location: { lat: 1.2868, lng: 103.8539 },
    imageUrl: "https://i.imgur.com/hotel-fullerton.jpeg",
  },
  // Hotels for Swiss Alps
  {
    destinationId: "alps",
    name: "Grand Hotel Zermatterhof",
    price: 600,
    rating: 4.9,
    features: ["Mountain View", "Ski-in/Ski-out", "Spa & Wellness"],
    location: { lat: 46.0207, lng: 7.7486 },
    imageUrl: "https://i.imgur.com/hotel-zermatterhof.jpeg",
  },
  // Hotels for Shanghai
  {
    destinationId: "shanghai",
    name: "The Peninsula Shanghai",
    price: 550,
    rating: 4.7,
    features: ["Bund View", "Rooftop Terrace", "Luxury Suites"],
    location: { lat: 31.2391, lng: 121.4881 },
    imageUrl: "https://i.imgur.com/hotel-peninsula.jpeg",
  },
];

// 3. CAR RENTAL DATA (Mock data for general availability)
const cars = [
  {
    model: "Toyota Corolla",
    type: "Sedan",
    dailyRateUSD: 45,
    imageUrl: "https://i.imgur.com/car-corolla.jpeg",
  },
  {
    model: "BMW X5",
    type: "SUV",
    dailyRateUSD: 120,
    imageUrl: "https://i.imgur.com/car-bmwx5.jpeg",
  },
  {
    model: "Mercedes E-Class",
    type: "Luxury Sedan",
    dailyRateUSD: 180,
    imageUrl: "https://i.imgur.com/car-mercedes.jpeg",
  },
  {
    model: "Volkswagen Golf",
    type: "Hatchback",
    dailyRateUSD: 35,
    imageUrl: "https://i.imgur.com/car-golf.jpeg",
  },
];

// Export the data for the user to manually upload to their Firestore collections
// Collections to create: 'destinations', 'hotels', 'cars'
module.exports = {
  destinations,
  hotels,
  cars,
};
