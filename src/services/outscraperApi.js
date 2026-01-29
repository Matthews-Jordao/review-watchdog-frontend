// Outscraper API integration service for fetching comprehensive reviews
// This service provides access to all reviews for a business, not just the limited set from Google Places API


const API_KEY = import.meta.env.VITE_OUTSCRAPER_API_KEY;
const BASE_URL = 'https://api.outscraper.cloud';
import { mockBusinesses } from '../utils/mockBusinesses';

/**
 * Fetch reviews for a business using Outscraper API or mock data
 * @param {string} placeId - Google Places Place ID
 * @param {number} limit - Number of reviews to fetch
 * @param {number} skip - Number of reviews to skip
 * @param {string} sort - Sort order ("newest" or "oldest")
 * @returns {Promise<{reviews: Array, totalReviews: number, hasMore: boolean}>}
 */
export async function fetchBusinessReviews(placeId, limit = 25, skip = 0, sort = 'newest') {
  if (!API_KEY) {
    // Use mock data if no API key
    const business = mockBusinesses.find(biz => biz.place_id === placeId || biz.id === placeId);
    if (!business || !business.reviews) {
      return { reviews: [], totalReviews: 0, hasMore: false };
    }
    let reviews = [...business.reviews];
    if (sort === 'newest') {
      reviews = reviews.reverse();
    }
    const pagedReviews = reviews.slice(skip, skip + limit);
    return {
      reviews: pagedReviews,
      totalReviews: reviews.length,
      hasMore: skip + limit < reviews.length
    };
  }
  // Use real Outscraper API if API key is present
  try {
    const url = new URL(`${BASE_URL}/google-maps-reviews`);
    url.searchParams.append('query', placeId);
    url.searchParams.append('reviewsLimit', (skip + limit).toString());
    url.searchParams.append('sort', sort);
    url.searchParams.append('async', 'false');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Outscraper API error:', response.status, errorText);
      throw new Error(`Outscraper API error: ${response.status}`);
    }

    const data = await response.json();
    // Transform Outscraper response to our review format
    return transformOutscraperResponse(data, limit, skip);
  } catch (error) {
    console.error('Error fetching reviews from Outscraper:', error);
    throw error;
  }
}

/**
 * Fetch more reviews (pagination)
 * @param {string} placeId
 * @param {number} limit
 * @param {number} skip
 * @param {string} sort
 * @returns {Promise<{reviews: Array, totalReviews: number, hasMore: boolean}>}
 */
export async function fetchMoreReviews(placeId, limit = 25, skip = 0, sort = 'newest') {
  return fetchBusinessReviews(placeId, limit, skip, sort);
}

/**
 * Transform Outscraper response to our review format
 * @param {Object} data - Raw response from Outscraper API
 * @param {number} limit - Number of reviews requested
 * @param {number} skip - Number of reviews to skip
 * @returns {Object} Transformed review data
 */
function transformOutscraperResponse(data, limit = 25, skip = 0) {
  // Check if we have a successful response with data
  if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return { reviews: [], totalReviews: 0, hasMore: false, lastPaginationId: null };
  }
  
  const businessData = data.data[0]; // Get the first (and usually only) business result
  
  if (!businessData) {
    return { reviews: [], totalReviews: 0, hasMore: false, lastPaginationId: null };
  }

  const reviews = businessData.reviews_data ? businessData.reviews_data.map((review, index) => ({
    id: `${review.reviews_id || review.author_id || 'review'}-${index}-${review.review_timestamp || Date.now()}`,
    authorName: review.author_title || 'Anonymous User',
    authorPhotoUrl: review.author_image || null,
    rating: review.review_rating || 0,
    text: review.review_text || '', // Keep empty text for rating-only reviews
    time: review.review_timestamp ? review.review_timestamp * 1000 : Date.now(), // Convert to milliseconds
    relativeTimeDescription: review.review_datetime_utc || 'Recently',
    platform: 'google',
    reviewLink: review.review_link || null,
    likes: review.review_likes || 0,
    images: review.review_img_urls || (review.review_img_url ? [review.review_img_url] : [])
  })) : [];

  // Slice the results to get only the new reviews (skip the ones we already have)
  const newReviews = skip > 0 ? reviews.slice(skip) : reviews;
  
  // Determine if there are more reviews available
  const totalReviews = businessData.reviews || 0;
  const currentBatchCount = newReviews.length;
  const totalFetched = skip + currentBatchCount;
  
  // More reviews available if we got a full batch and haven't reached the total
  const hasMore = currentBatchCount === limit && (totalReviews === 0 || totalFetched < totalReviews);

  console.log('Outscraper pagination info:', {
    totalReviews,
    skip,
    limit,
    reviewsFetched: reviews.length,
    newReviewsReturned: currentBatchCount,
    totalFetched,
    hasMore
  });

  return {
    reviews: newReviews,
    totalReviews: totalReviews,
    businessName: businessData.name || '',
    businessRating: businessData.rating || 0,
    hasMore: hasMore,
    lastPaginationId: null // Not used in skip-based approach
  };
}

