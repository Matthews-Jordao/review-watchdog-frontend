# Review Watchdog Frontend

A React application for viewing business reviews and ratings across multiple platforms including Google, Facebook, and Yelp.

## Features

- Search for local businesses using Google Places API
- View comprehensive business details with hours and contact info
- Browse unlimited reviews from multiple platforms via Outscraper API
- Filter reviews by rating and date
- Responsive design optimized for desktop and mobile
- Pagination system for efficient review loading

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Google Cloud Platform account
- Outscraper account (for extended review data)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd review-watchdog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your API keys:
   
   - **Google Places API Key**: Get from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials)
     - Enable "Places API (New)" and "Geocoding API"
     - Restrict the key to your domain for security
   
   - **Outscraper API Key**: Get from [Outscraper Dashboard](https://app.outscraper.cloud/api-key)
     - Used for fetching comprehensive review data beyond Google's limitations

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## API Configuration

### Google Places API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Places API (New)
   - Geocoding API
4. Create an API key and add it to your `.env` file
5. Restrict the API key to prevent unauthorized usage

### Outscraper API Setup
1. Sign up at [Outscraper](https://app.outscraper.cloud/)
2. Get your API key from the dashboard
3. Add it to your `.env` file as `VITE_OUTSCRAPER_API_KEY`

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Main page components
├── services/          # API integration services
├── styles/            # Global styles and variables
└── utils/             # Utility functions
```

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Google Places API** - Business search and basic data
- **Outscraper API** - Comprehensive review aggregation
- **CSS3** - Styling with custom properties

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Search for businesses** using the search bar on the homepage
2. **Browse results** with business cards showing ratings and basic info
3. **Click "View All Reviews"** to see detailed business page
4. **Filter reviews** by rating (1-5 stars) and date range
5. **Load more reviews** using the "Load More" button

## Notes for Instructors

- The `.env` file is gitignored for security - use `.env.example` as template
- Both APIs require valid keys and billing setup to function
- Google Places API provides business data and up to 5 reviews
- Outscraper API provides unlimited reviews when Google's limit is reached
- Error handling is implemented for missing or invalid API keys

## License

This project is for educational purposes.