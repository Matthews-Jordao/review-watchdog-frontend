# Google Places API Setup Guide

This application integrates with the Google Places API to provide business search functionality. Follow these steps to set up the API integration:

## 1. Get Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Places API (New)**
   - **Geocoding API**
   - **Places API** (legacy, if needed)

4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > API Key**
6. Copy your API key

## 2. Configure API Key

1. Open the `.env` file in the root directory
2. Replace `your_google_places_api_key_here` with your actual API key:
   ```
   VITE_GOOGLE_PLACES_API_KEY=AIzaSyBcdefghijklmnopqrstuvwxyz1234567890
   ```

## 3. Secure Your API Key

1. In Google Cloud Console, go to **APIs & Services > Credentials**
2. Click on your API key to edit it
3. Under **Application restrictions**, choose:
   - **HTTP referrers (web sites)** for production
   - Add your domain (e.g., `https://yourdomain.com/*`)
4. Under **API restrictions**, select:
   - **Restrict key**
   - Choose **Places API (New)** and **Geocoding API**

## 4. API Usage

The application uses three main API functions:

- `searchBusinesses(query)` - Search for businesses by name or category
- `getBusinessDetails(placeId)` - Get detailed information about a specific business  
- `searchNearbyBusinesses(location, radius, type)` - Find businesses near a location

## 5. Cost Considerations

Google Places API charges per request. Monitor your usage in the Google Cloud Console to avoid unexpected charges. Consider implementing:
- Request caching
- Rate limiting  
- Geographic restrictions

## 6. Testing

You can test the API integration by:
1. Starting the development server: `npm run dev`
2. Using the search bar on the homepage
3. Searching for local businesses like "pizza", "restaurants", etc.

## Troubleshooting

**Common Issues:**
- **403 Forbidden**: Check that your API key is correctly set and the Places API is enabled
- **CORS Errors**: Ensure your domain is added to the API key restrictions
- **No Results**: Verify the API key has the correct permissions and billing is enabled

**Debug Tips:**
- Check browser console for error messages
- Verify the API key in `.env` file (restart server after changes)
- Test API key directly in Google Cloud Console

For more detailed information, see the [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview).