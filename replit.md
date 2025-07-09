# Project Documentation

## Overview

MB ZONE is a ReactJS-based food ordering website similar to Swiggy India. It provides an intuitive interface for users to browse restaurants, view menus, and order food online. Built with modern web technologies for a responsive and engaging user experience.

## User Preferences

- Preferred communication style: Simple, everyday language
- Technology stack: HTML, CSS, JavaScript, ReactJS, Tailwind CSS only (no TypeScript)
- Design inspiration: Swiggy India food delivery platform

## System Architecture

**Full-Stack Application Ready**
- Single Page Application (SPA) built with React 19.1.0
- Vite for development server and build tooling
- Tailwind CSS 3.3.0 for styling with orange color scheme
- Component-based architecture with reusable UI elements
- PostgreSQL database schema for data persistence
- Local storage integration for immediate user experience
- State management with context-aware data flow
- Responsive design optimized for mobile and desktop

## Key Components

1. **Header.jsx** - Enhanced navigation with user authentication, profile menu, and search
2. **Hero.jsx** - Landing banner with call-to-action buttons
3. **RestaurantList.jsx** - Restaurant cards with filtering, search, and favorites
4. **RestaurantCard.jsx** - Interactive restaurant display with menu, customization, and favorites
5. **Cart.jsx** - Advanced shopping cart with detailed billing, login prompts, and checkout
6. **AuthModal.jsx** - Complete authentication system with login and registration
7. **UserProfile.jsx** - User account management with order history and favorites
8. **OrderTracking.jsx** - Real-time order status tracking with progress indicators
9. **Checkout.jsx** - Comprehensive checkout with payment methods, scheduling, and coupons
10. **Footer.jsx** - Site footer with links and company information

## Data Flow

- Advanced state management using React hooks with localStorage persistence
- Restaurant and menu data with dynamic filtering and search capabilities
- Enhanced cart functionality with unique item IDs and customization support
- User authentication with session management and persistent login
- Favorites system with real-time updates and storage
- Order history tracking with status management
- Address management with multiple saved locations
- Coupon system with real-time discount calculations
- Search and category filtering implemented client-side
- Real-time cart updates with detailed billing breakdown

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
- ✓ July 9, 2025: Removed "What's on your mind" section as requested
- ✓ July 9, 2025: Implemented comprehensive customer authentication system
- ✓ July 9, 2025: Added user profiles with order history and favorites
- ✓ July 9, 2025: Created complete checkout process with multiple payment methods
- ✓ July 9, 2025: Built real-time order tracking with status updates
- ✓ July 9, 2025: Added food customization options (spice level, size, instructions)
- ✓ July 9, 2025: Implemented favorites system for restaurants and items
- ✓ July 9, 2025: Added delivery scheduling and address management
- ✓ July 9, 2025: Enhanced cart with detailed bill breakdown and login prompts
- ✓ July 9, 2025: Created PostgreSQL database schema for full data persistence
- ✓ July 9, 2025: Added coupon system with discount calculations and tips