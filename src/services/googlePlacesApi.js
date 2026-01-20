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
    throw new Error('Failed to search businesses. Please check your API key configuration.');
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
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,photos,reviews,businessStatus,websiteUri,internationalPhoneNumber,regularOpeningHours,types'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const place = await response.json();
    return transformPlaceToBusinessDetail(place);

  } catch (error) {
    console.error('Error getting business details:', error);
    // Fallback to mock data for development
    return {
      id: placeId,
      name: 'Sample Business',
      address: '123 Main Street, Anytown, ST 12345',
      rating: 4.5,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      website: 'https://example.com',
      phoneNumber: '+1 (555) 123-4567',
      hours: {
        periods: [
          { open: { day: 1, time: '0900' }, close: { day: 1, time: '1800' } },
          { open: { day: 2, time: '0900' }, close: { day: 2, time: '1800' } },
          { open: { day: 3, time: '0900' }, close: { day: 3, time: '1800' } },
          { open: { day: 4, time: '0900' }, close: { day: 4, time: '1800' } },
          { open: { day: 5, time: '0900' }, close: { day: 5, time: '1800' } },
          { open: { day: 6, time: '1000' }, close: { day: 6, time: '1600' } }
        ]
      },
      reviews: [
        {
          id: '1',
          authorName: 'Jessica Rabbit',
          rating: 5,
          text: 'Amazing service and great atmosphere! The staff was very friendly and accommodating. Would definitely recommend to anyone looking for quality service.',
          time: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
          relativeTimeDescription: '1 week ago',
          authorPhotoUrl: null,
          platform: 'google'
        },
        {
          id: '2',
          authorName: 'John Smith',
          rating: 4,
          text: 'Good experience overall. Quick service and reasonable prices. Will definitely be coming back.',
          time: Date.now() - (14 * 24 * 60 * 60 * 1000), // 2 weeks ago
          relativeTimeDescription: '2 weeks ago',
          authorPhotoUrl: null,
          platform: 'google'
        },
        {
          id: '3',
          authorName: 'Mary Johnson',
          rating: 5,
          text: 'Exceptional quality and service! Exceeded all my expectations. Highly recommended for anyone in the area.',
          time: Date.now() - (21 * 24 * 60 * 60 * 1000), // 3 weeks ago
          relativeTimeDescription: '3 weeks ago',
          authorPhotoUrl: null,
          platform: 'google'
        }
      ]
    };
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
    place_id: place.id, // Add this for navigation
    placeId: place.id,
    businessStatus: place.businessStatus || 'OPERATIONAL',
    website: place.websiteUri || null,
    phoneNumber: place.internationalPhoneNumber || null
  };
}

/**
 * Transform Google Places API response to detailed business format with reviews
 * @param {Object} place - Place object from Google Places API  
 * @returns {Object} - Detailed business object for business detail page
 */
function transformPlaceToBusinessDetail(place) {
  // Get the first photo if available
  const photo = place.photos && place.photos.length > 0 ? place.photos[0] : null;
  const imageUrl = getPhotoUrl(photo, 800); // Larger image for detail page

  // Extract rating information
  const rating = place.rating || 0;
  const reviewCount = place.userRatingCount || 0;

  // Transform reviews if available
  const reviews = place.reviews ? place.reviews.map((review, index) => ({
    id: `review-${index}`,
    authorName: review.authorAttribution?.displayName || 'Anonymous User',
    rating: review.rating || 0,
    text: review.text?.text || 'No review text available',
    time: review.publishTime ? new Date(review.publishTime).getTime() : Date.now(),
    relativeTimeDescription: review.relativePublishTimeDescription || 'Recently',
    authorPhotoUrl: review.authorAttribution?.photoUri || null,
    platform: 'google'
  })) : [];

  return {
    id: place.id,
    name: place.displayName?.text || 'Unknown Business',
    address: place.formattedAddress || 'Address not available',
    rating: rating,
    reviewCount: reviewCount,
    image: imageUrl,
    category: extractCategory(place),
    website: place.websiteUri || null,
    phoneNumber: place.internationalPhoneNumber || null,
    businessStatus: place.businessStatus || 'OPERATIONAL',
    hours: place.regularOpeningHours || null,
    reviews: reviews,
    placeId: place.id
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