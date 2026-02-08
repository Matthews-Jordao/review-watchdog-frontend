# Review Watchdog Frontend

This is a React application I built to solve a problem I personally experienced - having to check multiple review sites like Google, Facebook, and Yelp just to get a complete picture of what people think about a business. With Review Watchdog, you can search for any business and see all the reviews in one place.

## Live Demo

You can check out the live application here: [Review Watchdog Frontend](https://matthews-jordao.github.io/review-watchdog-frontend/)

*Note: Full functionality requires API keys - see setup section below*

## What it does

I wanted to create something that would save time when researching local businesses. Here's what the app can do:

- Search for businesses in your area and get detailed information
- View ratings and reviews from multiple platforms without switching between websites
- Filter reviews by star rating or sort by date to find the most relevant feedback
- See way more than just the 5 reviews Google normally shows you
- Get all the business details you need (hours, phone, website) in one place

The interface is clean and works great on both desktop and mobile.

## Key Features

**Business Search & Discovery**
I integrated Google Places API to handle the business search functionality. It finds businesses in real-time and provides all the basic info like hours, phone numbers, and addresses.

**Extended Review Access** 
This was the trickiest part - Google's API only gives you 5 reviews per business, which isn't very helpful. I solved this by integrating Outscraper's API, which can pull way more reviews from multiple platforms. Now users can see dozens of reviews instead of just a handful.

**Smart Filtering**
Added filters for star ratings and date sorting because nobody wants to scroll through hundreds of reviews to find what they're looking for.

**Responsive Design**
Made sure it works perfectly on phones since that's probably where most people would use this.

## How I Built It

**APIs I'm Using:**

*Google Places API* - This handles finding businesses and getting basic info. I chose the "New" version because it's more reliable and gives better data than the legacy version.

*Outscraper API* - This was a game-changer for getting unlimited reviews. Google restricts you to 5 reviews, but Outscraper can pull comprehensive review data from multiple platforms. It's what makes this app actually useful instead of just another basic business finder.

The way it works: Google Places API handles the search and basic business info, then when someone clicks "View All Reviews", Outscraper takes over and loads all the reviews with proper pagination so it doesn't crash the browser.

## Technical Stuff

## �️ Setup Instructions

## Running It Locally

If you want to run this locally, you'll need to get your own API keys:

1. Clone the repo: `git clone https://github.com/Matthews-Jordao/review-watchdog-frontend.git`
2. Install dependencies: `npm install`  
3. Copy `.env.example` to `.env` and add your API keys:
   - Google Places API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Outscraper API key from [their dashboard](https://app.outscraper.cloud/)
4. Start it up: `npm run dev`

Both APIs require billing setup, so keep that in mind. Google gives you some free credits to start with.

## Notes

This was a fun project to work on because it actually solves a real problem I had. The biggest challenge was working around Google's review limitations and figuring out the right way to paginate through large review datasets without making the UI slow.

The live demo on GitHub Pages shows the full functionality, though you'd need your own API keys to search for different businesses.

## Project Pitch Video

Check out [this video](https://www.loom.com/share/0ed3de55ea22433b8f41db49e2cbda15), where I describe my project and some challenges I faced while building it.