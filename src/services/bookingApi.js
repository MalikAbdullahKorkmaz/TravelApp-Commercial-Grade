import { RAPID_API_KEY, RAPID_API_HOST_BOOKING } from '../config/apiKeys';

const BOOKING_BASE_URL = `https://${RAPID_API_HOST_BOOKING}`;

/**
 * Fetches hotel data for a given destination (city/location).
 * NOTE: The Booking.com API requires a specific location ID, which is not available in the current destination data.
 * For demonstration, this function will use a hardcoded location ID (e.g., for Paris) and rely on the user to update it.
 * In a real application, a separate 'auto-complete' endpoint would be called first to get the location ID.
 * 
 * @param {string} destinationName The name of the city/destination.
 * @returns {Promise<Array>} A list of hotel objects.
 */
export const fetchHotels = async (destinationName) => {
  if (!RAPID_API_KEY || !RAPID_API_HOST_BOOKING) {
    console.error("RapidAPI keys are missing.");
    return [];
  }

  // Hardcoded parameters for demonstration purposes (e.g., Paris location ID)
  // The user needs to replace this with a dynamic call to a location search endpoint.
  const hardcodedLocationId = '5494'; // Example: Paris, France
  
  const url = `${BOOKING_BASE_URL}/stays/search?location_id=${hardcodedLocationId}&checkin_date=2024-12-01&checkout_date=2024-12-05&adults_number=2&room_number=1&order_by=popularity&currency=USD&locale=en-US`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST_BOOKING,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // The API response structure is complex. We need to extract the relevant hotel list.
    // Assuming the hotel list is under data.results (this is a common pattern).
    if (data.result) {
      // Filter and map the complex API response to a simpler structure for the app
      return data.result.map(hotel => ({
        id: hotel.hotel_id,
        name: hotel.hotel_name,
        price: hotel.price_breakdown.all_inclusive_price.value,
        rating: hotel.review_score,
        address: hotel.address,
        imageUrl: hotel.max_photo_url,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching hotels from Booking.com API:', error);
    return [];
  }
};
