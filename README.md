# TravelApp - React Native Mobile Application

**Student**: Abdullah Malik Korkmaz  
**Student Number**: 20230040342  
**Program**: Informatics Engineering

A beautiful and functional travel booking application built with React Native and Expo, featuring bottom tab navigation, reusable components, and comprehensive destination management.

## Project Overview

TravelApp is a mobile application that allows users to explore travel destinations, view detailed information, and manage their travel preferences. The application follows modern React Native best practices and includes a clean, intuitive user interface.

## Features

### 1. Bottom Tab Navigation
- **Home Tab**: Displays greeting, promotional banner, and popular destinations
- **Explore Tab**: Shows all available destinations with category filtering
- **Profile Tab**: User profile information and account management

### 2. Home Screen
- Personalized greeting message ("Hi, Haikal")
- "Plan Your Summer!" promotional banner
- Search functionality
- Popular Destination section with destination cards
- Quick access to explore all destinations

### 3. Explore Screen
- Complete list of all destinations
- Category filtering (All, Beach, Mountain, City, Cultural)
- Destination cards with ratings and pricing
- Navigation to detailed destination information

### 4. Detail Screen
- Full destination image with back and favorite buttons
- Comprehensive destination information:
  - Title and location
  - Star rating
  - Detailed description
  - GPS coordinates (latitude and longitude)
- Available ticket options with pricing
- Booking functionality
- Floating "Book Now" button

### 5. Profile Screen
- User profile information
- Profile statistics (Trips, Reviews, Favorites)
- Menu items for:
  - Saved Trips
  - Booking History
  - Favorites
  - Settings
  - Help & Support
  - Logout

### 6. Reusable Components
- **DestinationCard**: Displays destination information with image, rating, price, and favorite button
- Consistent styling across the application
- Responsive design for different screen sizes

## Technical Specifications

### Technology Stack
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **Icons**: React Native Vector Icons (Material Community Icons)
- **State Management**: React Hooks (useState)
- **Data Structure**: Local JavaScript array

### Project Structure
```
Travelapp-assignment/
├── App.js                          # Main application file with navigation setup
├── index.js                        # Entry point
├── package.json                    # Dependencies and scripts
├── screens/
│   ├── HomeScreen.js              # Home tab screen
│   ├── ExploreScreen.js           # Explore tab screen
│   ├── ProfileScreen.js           # Profile tab screen
│   └── DetailsScreen.js           # Destination details screen
├── components/
│   └── DestinationCard.js         # Reusable destination card component
├── data/
│   └── destinations.js            # Destination data array
└── assets/                         # Images and other assets
```

## Data Structure

### Destination Object
```javascript
{
  id: number,
  title: string,
  country: string,
  image: require(...),
  rating: number,
  price: number,
  description: string,
  coordinates: {
    lat: number,
    lng: number
  }
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MalikAbdullahKorkmaz/Travelapp-assignment.git
   cd Travelapp-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your device:
   - **iOS**: Press `i` in the terminal
   - **Android**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal

## Navigation Flow

```
App (Bottom Tab Navigator)
├── Home Stack
│   ├── HomeScreen
│   └── DetailsScreen
├── Explore Stack
│   ├── ExploreScreen
│   └── DetailsScreen
└── Profile Stack
    └── ProfileScreen
```

## Key Features Implementation

### 1. Bottom Tab Navigation
- Implemented using `@react-navigation/bottom-tabs`
- Three main tabs: Home, Explore, Profile
- Custom styling with Material Community Icons
- Active/inactive state colors (#FF6B6B for active)

### 2. Data Passing to Detail Screen
- Uses React Navigation params
- Destination object passed from card selection
- Detail screen accesses data via `route.params.destination`

### 3. Reusable Components
- DestinationCard component accepts:
  - `destination`: Destination object
  - `onPress`: Callback for card selection
  - `onFavoritePress`: Callback for favorite toggle
- Consistent styling and behavior across screens

### 4. User Interactions
- Favorite button with heart icon toggle
- Ticket selection in detail screen
- Booking confirmation
- Navigation between screens
- Category filtering in explore screen

## Styling & Design

- **Color Scheme**:
  - Primary: #FF6B6B (Red/Coral)
  - Secondary: #FF9500 (Orange)
  - Background: #FFFFFF (White)
  - Text: #333333 (Dark Gray)

- **Typography**:
  - Large titles: 28px, fontWeight: 700
  - Section titles: 18px, fontWeight: 700
  - Body text: 14px, fontWeight: 400

- **Spacing**:
  - Consistent padding: 16px (horizontal), 12-20px (vertical)
  - Card margins: 8px (vertical), 16px (horizontal)

## Requirements Met

✅ Bottom Tab Navigation (Home, Explore, Profile)  
✅ Reusable DestinationCard component  
✅ Data passing from card to Detail Screen via params  
✅ Home Screen with greeting and popular destinations  
✅ Explore Screen with all destinations  
✅ Detail Screen with comprehensive information  
✅ GPS coordinates display  
✅ Ticket options and booking  
✅ Favorite functionality  
✅ Responsive design  
✅ Clean code structure  
✅ Professional UI/UX  

## Future Enhancements

- Backend API integration
- User authentication
- Real booking system
- Payment integration
- User reviews and ratings
- Wishlist functionality
- Map integration
- Push notifications
- Offline support

## License

0BSD

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Last Updated**: October 27, 2025
