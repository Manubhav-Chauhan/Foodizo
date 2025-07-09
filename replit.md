# Project Documentation

## Overview

MB ZONE is a ReactJS-based food ordering website similar to Swiggy India. It provides an intuitive interface for users to browse restaurants, view menus, and order food online. Built with modern web technologies for a responsive and engaging user experience.

## User Preferences

- Preferred communication style: Simple, everyday language
- Technology stack: HTML, CSS, JavaScript, ReactJS, Tailwind CSS only (no TypeScript)
- Design inspiration: Swiggy India food delivery platform

## System Architecture

**Frontend-Only Application**
- Single Page Application (SPA) built with React 19.1.0
- Vite for development server and build tooling
- Tailwind CSS 3.3.0 for styling
- Component-based architecture with reusable UI elements

## Key Components

1. **Header.jsx** - Navigation with logo, location, search bar, and cart icon
2. **Hero.jsx** - Landing banner with call-to-action buttons
3. **FoodCategories.jsx** - Food category grid with emoji icons
4. **RestaurantList.jsx** - Restaurant cards with filtering and search
5. **RestaurantCard.jsx** - Individual restaurant display with menu modal
6. **Cart.jsx** - Shopping cart with quantity controls and checkout
7. **Footer.jsx** - Site footer with links and company information

## Data Flow

- State management using React hooks (useState)
- Restaurant and menu data stored as static arrays in components
- Cart functionality with add/remove/update quantity operations
- Search and category filtering implemented client-side
- Real-time cart updates with item count display

## External Dependencies

- React 19.1.0 & React DOM for UI framework
- Vite 6.3.5 for development server and bundling
- Tailwind CSS 3.3.0 for styling
- PostCSS and Autoprefixer for CSS processing
- Google Fonts (Inter) for typography
- Unsplash images for restaurant photos

## Deployment Strategy

- Development server runs on Vite (port 3000)
- Production build creates optimized static files in dist/
- Compatible with Replit hosting platform
- Responsive design works across mobile and desktop devices

## Recent Changes

- ✓ July 9, 2025: Initial project setup with React + Vite + Tailwind
- ✓ July 9, 2025: Created complete component structure
- ✓ July 9, 2025: Added 6 sample restaurants with realistic menu items
- ✓ July 9, 2025: Implemented shopping cart functionality
- ✓ July 9, 2025: Fixed Tailwind CSS configuration issues
- ✓ July 9, 2025: Successfully deployed development server
- ✓ July 9, 2025: Confirmed website working properly on localhost