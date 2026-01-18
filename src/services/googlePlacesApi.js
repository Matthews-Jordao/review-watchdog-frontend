// Google Places API integration service
// Updated to use Places API (New) for better performance and features

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://places.googleapis.com/v1';

/**
 * Search for businesses using Google Places Text Search API (New)
 * @param {string} query - Search query for businesses
 * @param {string} location - Location to search in (optional)
 * @returns {Promise} Promise that resolves to formatted business search results
 */
export const searchBusinesses = async (query, location = '') => {
  if (!API_KEY) {
    console.error('Google Places API key is not configured');
    throw new Error('Google Places API key is not configured');
  }

  if (!query.trim()) {
    return {
      businesses: [],
      hasMore: false,
      totalCount: 0
    };
  }

  try {
    const searchQuery = location ? `${query} in ${location}` : query;
    
    const response = await fetch(`${BASE_URL}/places:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.reviews,places.businessStatus,places.types,places.websiteUri'
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        maxResultCount: 12, // Match our mock data count
        languageCode: 'en'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', response.status, errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Google Places API response:', data); // Debug logging
    
    // Transform Google Places data to our business card format
    const businesses = data.places ? data.places.map(transformPlaceToBusinessCard) : [];
    
    return {
      businesses,
      hasMore: businesses.length >= 12,
      totalCount: businesses.length
    };

  } catch (error) {
    console.error('Error searching businesses:', error);
    // Fallback to mock data on error for development
    const { searchMockBusinesses } = await import('../data/mockBusinesses.js');
    console.warn('Falling back to mock data due to API error');
    return searchMockBusinesses(query);
  }
};

/**
 * Get detailed business information by Place ID
 * @param {string} placeId - Google Places Place ID
 * @returns {Promise} Promise that resolves to detailed business info
 */
export const getBusinessDetails = async (placeId) => {
  if (!API_KEY) {
    throw new Error('Google Places API key is not configured');
  }

  try {
    const response = await fetch(`${BASE_URL}/places/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,photos,reviews,businessStatus,website,phoneNumber,openingHours'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const place = await response.json();
    return transformPlaceToBusinessCard(place);

  } catch (error) {
    console.error('Error getting business details:', error);
    throw error;
  }
};

/**
 * Get photo URL from Google Places photo reference
 * @param {Object} photo - Photo object from Google Places API
 * @param {number} maxWidth - Maximum width for the photo
 * @returns {string} - Photo URL
 */
function getPhotoUrl(photo, maxWidth = 400) {
  if (!photo || !photo.name) {
    // Return a default business image if no photo available
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
  }

  return `${BASE_URL}/${photo.name}/media?maxWidthPx=${maxWidth}&maxHeightPx=300&key=${API_KEY}`;
}

/**
 * Transform Google Places API response to our business card format
 * @param {Object} place - Place object from Google Places API
 * @returns {Object} - Business card object matching our component expectations
 */
function transformPlaceToBusinessCard(place) {
  // Get the first photo if available
  const photo = place.photos && place.photos.length > 0 ? place.photos[0] : null;
  const imageUrl = getPhotoUrl(photo);

  // Extract rating information
  const rating = place.rating || 0;
  const reviewCount = place.userRatingCount || 0;

  return {
    id: place.id,
    name: place.displayName?.text || 'Unknown Business',
    address: place.formattedAddress || 'Address not available',
    rating: rating,
    reviewCount: reviewCount,
    image: imageUrl,
    category: extractCategory(place),
    
    // Additional metadata for future use
    placeId: place.id,
    businessStatus: place.businessStatus || 'OPERATIONAL',
    website: place.websiteUri || null,
    phoneNumber: place.phoneNumber || null
  };
}

/**
 * Extract business category from place data
 * @param {Object} place - Place object from Google Places API
 * @returns {string} - Business category
 */
function extractCategory(place) {
  // Check place types first
  if (place.types && place.types.length > 0) {
    const types = place.types;
    
    if (types.includes('restaurant') || types.includes('food') || types.includes('meal_takeaway')) {
      return 'Restaurant';
    }
    if (types.includes('cafe') || types.includes('bakery')) {
      return 'Coffee Shop';
    }
    if (types.includes('car_repair') || types.includes('car_dealer')) {
      return 'Automotive';
    }
    if (types.includes('veterinary_care')) {
      return 'Veterinary';
    }
    if (types.includes('store') || types.includes('shopping_mall')) {
      return 'Retail';
    }
    if (types.includes('hospital') || types.includes('doctor')) {
      return 'Healthcare';
    }
  }

  // Fallback to name analysis
  const name = (place.displayName?.text || '').toLowerCase();
  
  if (name.includes('pizza') || name.includes('restaurant') || name.includes('food')) {
    return 'Restaurant';
  }
  if (name.includes('coffee') || name.includes('cafe')) {
    return 'Coffee Shop';
  }
  if (name.includes('auto') || name.includes('repair')) {
    return 'Automotive';
  }
  if (name.includes('vet') || name.includes('animal')) {
    return 'Veterinary';
  }
  if (name.includes('shop') || name.includes('store')) {
    return 'Retail';
  }
  
  return 'Business';
}