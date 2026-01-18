// Mock business data for testing search functionality
export const mockBusinesses = [
  {
    id: 1,
    name: "Papa's Pizza Palace",
    address: "123 Main Street, Downtown",
    rating: 4.5,
    reviewCount: 247,
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    description: "Authentic Italian pizza with fresh ingredients and traditional recipes passed down through generations."
  },
  {
    id: 2,
    name: "Main Street Auto Repairs",
    address: "456 Industrial Ave, Auto District",
    rating: 4.8,
    reviewCount: 189,
    category: "Automotive",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
    description: "Trusted automotive repair shop with certified mechanics and honest pricing for all vehicle types."
  },
  {
    id: 3,
    name: "Brew & Bean Coffee House",
    address: "789 Coffee Lane, Arts District",
    rating: 4.3,
    reviewCount: 312,
    category: "Coffee Shop",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
    description: "Cozy coffee shop featuring locally roasted beans, fresh pastries, and a welcoming atmosphere."
  },
  {
    id: 4,
    name: "Sunset Veterinary Clinic",
    address: "321 Pet Care Drive, Residential Area",
    rating: 4.9,
    reviewCount: 156,
    category: "Veterinary",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
    description: "Compassionate veterinary care with modern facilities and experienced staff dedicated to pet health."
  },
  {
    id: 5,
    name: "Golden Dragon Chinese Restaurant",
    address: "567 Asia Town Boulevard, Cultural District",
    rating: 4.2,
    reviewCount: 203,
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop",
    description: "Traditional Chinese cuisine with an extensive menu of authentic dishes and friendly service."
  },
  {
    id: 6,
    name: "FitLife Gym & Wellness",
    address: "890 Health Street, Fitness Quarter",
    rating: 4.6,
    reviewCount: 428,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    description: "State-of-the-art fitness facility with personal training, group classes, and wellness programs."
  },
  {
    id: 7,
    name: "Books & Beyond Bookstore",
    address: "234 Literary Lane, University Area",
    rating: 4.7,
    reviewCount: 95,
    category: "Bookstore",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    description: "Independent bookstore with carefully curated selection, cozy reading areas, and literary events."
  },
  {
    id: 8,
    name: "Fresh Market Grocery",
    address: "678 Garden Road, Suburban Center",
    rating: 4.4,
    reviewCount: 267,
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
    description: "Family-owned grocery store specializing in fresh, local produce and organic products."
  },
  {
    id: 9,
    name: "Tech Solutions IT Services",
    address: "345 Innovation Drive, Tech Park",
    rating: 4.8,
    reviewCount: 134,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    description: "Professional IT support and computer repair services for businesses and individuals."
  },
  {
    id: 10,
    name: "Bloom Flower Shop",
    address: "123 Blossom Street, Garden District",
    rating: 4.5,
    reviewCount: 178,
    category: "Florist",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=200&fit=crop",
    description: "Beautiful fresh flowers and custom arrangements for all occasions with expert floral design."
  },
  {
    id: 11,
    name: "Slice of Heaven Pizzeria",
    address: "456 Cheese Avenue, Food Court",
    rating: 4.1,
    reviewCount: 298,
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
    description: "New York style pizza with crispy thin crust and premium toppings in a casual dining atmosphere."
  },
  {
    id: 12,
    name: "Quick Fix Auto Shop",
    address: "789 Mechanic Row, Service District",
    rating: 4.3,
    reviewCount: 145,
    category: "Automotive",
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
    description: "Fast and reliable auto repair services with transparent pricing and quality workmanship."
  }
];

// Function to simulate search with delay
export const searchMockBusinesses = (query, currentCount = 0) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const filteredBusinesses = mockBusinesses.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.category.toLowerCase().includes(query.toLowerCase()) ||
        business.description.toLowerCase().includes(query.toLowerCase())
      );
      
      // Return next 5 businesses
      const startIndex = currentCount;
      const endIndex = startIndex + 5;
      const results = filteredBusinesses.slice(startIndex, endIndex);
      
      resolve({
        businesses: results,
        hasMore: endIndex < filteredBusinesses.length,
        total: filteredBusinesses.length
      });
    }, 1000); // 1 second delay to simulate loading
  });
};