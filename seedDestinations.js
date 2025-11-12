// seedDestinations.js
// This file now serves as a local data source for destinations.

// Import local images
const images = {
  bali: require('./assets/real_images/bali.jpg'),
  paris: require('./assets/real_images/paris.jpg'),
  tokyo: require('./assets/real_images/tokyo.jpg'),
  venice: require('./assets/real_images/venice.jpg'),
  newyork: require('./assets/real_images/newyork.jpg'),
  dubai: require('./assets/real_images/dubai.jpg'),
  hawaii: require('./assets/real_images/hawaii.jpg'),
  seoul: require('./assets/real_images/seoul.jpg'),
  phuket: require('./assets/real_images/phuket.jpg'),
  cappadocia: require('./assets/real_images/cappadocia.jpg'),
};

export const destinations = [
  {
    title: "Bali",
    country: "Indonesia",
    description: "Experience the spiritual calm and tropical beauty of Bali.",
    price: 3500,
    rating: 5,
    image: images.bali,
    coordinates: { lat: -8.4095, lng: 115.1889 },
  },
  {
    title: "Paris",
    country: "France",
    description: "The city of love, art, and the Eiffel Tower.",
    price: 5000,
    rating: 5,
    image: images.paris,
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    title: "Tokyo",
    country: "Japan",
    description: "Where technology meets tradition — explore the vibrant Tokyo.",
    price: 4800,
    rating: 4.8,
    image: images.tokyo,
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    title: "Venice",
    country: "Italy",
    description: "Sail through romantic canals and experience classic Italian beauty.",
    price: 4200,
    rating: 4.7,
    image: images.venice,
    coordinates: { lat: 45.4408, lng: 12.3155 },
  },
  {
    title: "New York",
    country: "United States",
    description: "The city that never sleeps — skyscrapers, art, and endless energy.",
    price: 5500,
    rating: 5,
    image: images.newyork,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    title: "Dubai",
    country: "United Arab Emirates",
    description: "Luxury shopping, modern architecture, and desert adventures.",
    price: 4900,
    rating: 4.9,
    image: images.dubai,
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    title: "Hawaii",
    country: "United States",
    description: "Tropical paradise with volcanoes, beaches, and breathtaking views.",
    price: 4600,
    rating: 4.8,
    image: images.hawaii,
    coordinates: { lat: 19.8968, lng: -155.5828 },
  },
  {
    title: "Seoul",
    country: "South Korea",
    description: "A perfect mix of culture, food, and K-pop energy.",
    price: 4000,
    rating: 4.7,
    image: images.seoul,
    coordinates: { lat: 37.5665, lng: 126.978 },
  },
  {
    title: "Phuket",
    country: "Thailand",
    description: "Sun, sea, and smiles — explore Thailand’s most beautiful island.",
    price: 3800,
    rating: 4.8,
    image: images.phuket,
    coordinates: { lat: 7.8804, lng: 98.3923 },
  },
  {
    title: "Cappadocia",
    country: "Turkey",
    description: "Hot air balloons and fairy chimneys in a surreal landscape.",
    price: 3900,
    rating: 4.9,
    image: images.cappadocia,
    coordinates: { lat: 38.6431, lng: 34.8263 },
  },
];


// Mock data for car rentals
const carImages = {
    suv: require('./assets/real_images/car_suv.jpg'),
    sedan: require('./assets/real_images/car_sedan.png'),
    luxury: require('./assets/real_images/car_luxury.jpg'),
};

export const mockCarData = [
    {
        id: 'car1',
        model: 'Toyota RAV4 (SUV)',
        dailyRateUSD: 55,
        image: carImages.suv,
        features: ['Automatic', 'A/C', '4 Passengers', 'Large Luggage'],
    },
    {
        id: 'car2',
        model: 'Honda Civic (Sedan)',
        dailyRateUSD: 40,
        image: carImages.sedan,
        features: ['Automatic', 'A/C', '5 Passengers', 'Medium Luggage'],
    },
    {
        id: 'car3',
        model: 'Mercedes-Benz S-Class (Luxury)',
        dailyRateUSD: 180,
        image: carImages.luxury,
        features: ['Automatic', 'Premium Audio', 'Leather Seats', 'GPS'],
    },
    {
        id: 'car4',
        model: 'Nissan Versa (Economy)',
        dailyRateUSD: 30,
        image: carImages.sedan, // Reusing sedan image for economy
        features: ['Manual', 'A/C', '4 Passengers', 'Small Luggage'],
    },
    {
        id: 'car5',
        model: 'Ford Explorer (Large SUV)',
        dailyRateUSD: 70,
        image: carImages.suv,
        features: ['Automatic', 'A/C', '7 Passengers', 'Large Luggage'],
    },
];
