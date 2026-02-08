// src/utils/mockBusinesses.js
// Array of mock business objects for instructor/demo use

export const mockBusinesses = [
  {
    place_id: 'mock1',
    name: "Joe's Pizza Palace",
    address: '123 Main St, Springfield',
    rating: 4.7,
    userRatingCount: 120,
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    website: 'https://joespizza.com',
    businessStatus: 'OPERATIONAL',
    reviews: [
      { author: 'Alice', rating: 5, text: 'Best pizza in town!', platform: 'google' },
      { author: 'Bob', rating: 4, text: 'Great crust and sauce.', platform: 'yelp' }
    ]
  },
  {
    place_id: 'mock2',
    name: 'Downtown Auto Repair',
    address: '456 Commerce Ave, Springfield',
    rating: 4.3,
    userRatingCount: 87,
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    website: 'https://downtownauto.com',
    businessStatus: 'OPERATIONAL',
    reviews: [
      { author: 'Carlos', rating: 5, text: 'Fast and honest service.', platform: 'google' },
      { author: 'Dana', rating: 4, text: 'Fixed my car quickly.', platform: 'facebook' }
    ]
  },
  {
    place_id: 'mock3',
    name: 'Sunrise Coffee',
    address: '789 Market St, Springfield',
    rating: 4.9,
    userRatingCount: 200,
    category: 'Coffee Shop',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    website: 'https://sunrisecoffee.com',
    businessStatus: 'OPERATIONAL',
    reviews: [
      { author: 'Eve', rating: 5, text: 'Amazing lattes and pastries.', platform: 'yelp' },
      { author: 'Frank', rating: 5, text: 'Cozy atmosphere.', platform: 'google' }
    ]
  }
];
