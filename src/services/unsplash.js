import { UNSPLASH_ACCESS_KEY } from '../config/apiKeys';

const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';

/**
 * Fetches a high-quality image URL for a given query (destination name).
 * @param {string} query The search term (e.g., "Paris city").
 * @returns {Promise<string>} The URL of the image, or a default placeholder.
 */
export const fetchUnsplashImage = async (query) => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error("Unsplash Access Key is missing.");
    return 'https://via.placeholder.com/800x600?text=Image+Not+Available';
  }

  try {
    const response = await fetch(`${UNSPLASH_BASE_URL}?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Use the regular size image for a good balance of quality and load time
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
  }

  return 'https://via.placeholder.com/800x600?text=Image+Not+Found';
};
