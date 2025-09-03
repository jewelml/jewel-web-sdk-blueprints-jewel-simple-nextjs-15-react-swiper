# Jewel ML - Web Basic Usage Example (Next.js 15)

A web application example demonstrating how to integrate and use the Jewel ML Recommendations API. This project showcases different recommendation models and provides an interactive interface for testing product recommendations using Next.js 15 with TypeScript and the App Router.

## Tech Stack

- **Next.js** 15.5.2 - React framework with App Router and server-side rendering
- **React** 19.1.0 - User interface library
- **TypeScript** 5.x - Type-safe development
- **Swiper** 11.2.10 - Modern carousel/slider library
- **Jewel ML API** - Machine learning recommendation service

## Available Recommendation Models

The application supports four different recommendation models:

- **L_prod (You May Like)** - Personalized recommendations based on user historical behavior. Requires a unique_id.
- **B_prod (Similar Items)** - Products similar to the item currently being viewed. Requires an item_id.
- **F_prod (Frequently Bought Together)** - Items that are commonly purchased in the same transaction. Requires an item_id.
- **T_prod (Top Sellers)** - The most popular items across the entire product catalog.

## Prerequisites

- Node.js (version 18.18.0 or higher)
- npm (version 9.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd jewel-simple-nextjs-15-react-swiper
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. **Enter an Item ID**: Input a product identifier in the search field (e.g., "1177646331_multicolor")
2. **Select Models**: Choose one or multiple recommendation models from the dropdown
3. **Load Recommendations**: Click the "Load Recommendations" button to fetch results
4. **Browse Results**: Navigate through product carousels using arrow controls
5. **View API Data**: Expand "View Raw API Response" sections to inspect returned data

## Project Structure

```
jewel-simple-nextjs-15-react-swiper/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Main page with SSR logic
│   │   └── globals.css          # Global styles
│   ├── components/          # React components (TypeScript)
│   │   ├── ProductCarousel.tsx      # Product display carousel
│   │   ├── ClientProductCarousel.tsx # Client wrapper for dynamic import
│   │   └── SearchControls.tsx       # Search and model selection interface
│   └── types/               # TypeScript type definitions
│       └── index.ts             # Shared interfaces and types
├── public/                  # Static assets
│   └── favicon.png             # Custom favicon
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
└── README.md               # This file
```

## API Configuration

The application connects to the Jewel ML Recommendations API:

- **Endpoint**: `https://repersonalize.jewelml.io/c/p/{integrationId}/l`
- **Required Parameters**:
  - `model`: Recommendation model identifier
  - `item_id`: Product identifier for context
  - `minimum_items`: Minimum number of items to return (default: 2)
  - `number_of_placements`: Maximum number of recommendations (default: 20)

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack on port 3000
- `npm run build` - Creates an optimized production build with Turbopack
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint for code quality

## Development Notes

- **App Router**: Uses Next.js 15 App Router for modern routing and layouts
- **Server Components**: Main page uses async Server Components for data fetching
- **Client Components**: Swiper and interactive controls use client-side rendering
- **TypeScript**: Full type safety across components and API responses
- **Dynamic Imports**: Swiper component loaded client-side to avoid SSR issues
- **Parallel API Calls**: Multiple model requests processed concurrently on the server
- **Responsive Design**: Each carousel displays up to 5 items per view on desktop
- **Navigation**: Advances by the number of visible slides for better user experience

## Next.js 15 Features

- **Turbopack**: Fast bundler for development and production
- **React 19**: Latest React with improved performance
- **App Router**: File-system based routing with layouts
- **Server Components**: Default server-side rendering for better performance
- **TypeScript Integration**: Built-in TypeScript support with optimal configuration