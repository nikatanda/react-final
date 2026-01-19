# Movie Discovery Platform 🎬

A modern, responsive movie discovery web application built with React, TypeScript, and SASS. Explore thousands of movies, discover new favorites, and manage your watchlist.


## ✨ Features

### Core Requirements ✅

- **React Hooks** - Functional components using useState, useEffect, useContext, and custom hooks
- **React Router** - Multi-page navigation with dynamic routes
- **API Integration** - Axios-based integration with The Movie Database (TMDB) API
- **Local/Session Storage** - Persistent favorites storage and session management
- **Responsive Design** - Fully responsive across all device sizes (mobile, tablet, desktop)
- **Animations & Modals** - Smooth animations and modal windows throughout the app
- **Clean Project Structure** - Well-organized folder structure following React best practices

### Bonus Features 🎁

- **TypeScript** - Full type safety throughout the application
- **SASS/SCSS** - Advanced styling with variables, mixins, and nested selectors
- **Dark/Light Theme** - Toggle between light and dark themes with persistent storage
- **Multi-language Support** - English and Georgian (ქართული) language support
- **Advanced React Features** - Context API, custom hooks, lazy loading, and more

## 🚀 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **SASS/SCSS** - CSS preprocessor
- **i18next** - Internationalization framework
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
movie-discovery-platform/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header/
│   │   ├── MovieCard/
│   │   ├── Modal/
│   │   └── LoadingSpinner/
│   ├── contexts/            # React contexts
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── i18n/               # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       └── ka.json
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── MovieDetails/
│   │   ├── Favorites/
│   │   └── Search/
│   ├── services/           # API services
│   │   └── api.ts
│   ├── styles/             # Global styles
│   │   ├── variables.scss
│   │   ├── main.scss
│   │   └── app.scss
│   ├── utils/              # Utility functions
│   │   └── storage.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/movie-discovery-platform.git
cd movie-discovery-platform
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure API Key

1. Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Add your API key
   ``` you can directly edit`src/services/api.ts` and replace the placeholder API key

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 📱 Pages

### 1. Home Page (`/`)

- Displays popular, top-rated, now playing, and upcoming movies
- Infinite scroll with "Load More" functionality
- Movie cards with hover effects and quick favorite toggle

### 2. Movie Details Page (`/movie/:id`)

- Comprehensive movie information
- Cast and crew details
- Similar movies recommendations
- Add/remove from favorites
- Watch trailer modal (placeholder)

### 3. Favorites Page (`/favorites`)

- View all favorited movies
- Remove movies from favorites
- Empty state with call-to-action

### 4. Search Page (`/search`)

- Real-time movie search with debouncing
- Paginated results
- Responsive search interface

## 🎨 Features in Detail

### Theme Toggle

- Toggle between light and dark themes
- Theme preference saved in localStorage
- Smooth transitions between themes

### Language Support

- English (en) and Georgian (ka)
- Language preference saved in localStorage
- All UI text translated

### Favorites System

- Add/remove movies from favorites
- Persistent storage using localStorage
- Accessible from any page

### Responsive Design

- Mobile-first approach
- Breakpoints: 320px, 576px, 768px, 992px, 1200px, 1400px
- Optimized for all Chrome DevTools device sizes

## 🎯 Usage Examples

### Adding a Movie to Favorites

1. Navigate to any movie card
2. Click the heart icon (🤍) on hover
3. The icon changes to ❤️ indicating it's favorited
4. View all favorites on the Favorites page

### Changing Theme

1. Click the theme toggle button (🌙/☀️) in the header
2. The entire app switches themes instantly
3. Your preference is saved automatically

### Changing Language

1. Click the language toggle button (🇬🇧/🇬🇪) in the header
2. All text updates to the selected language
3. Your preference is saved automatically

## 🔧 Configuration

### Customizing Colors

Edit `src/styles/variables.scss` to change the color scheme:

```scss
$primary-color: #e50914;
$secondary-color: #f5f5f1;
$accent-color: #ff6b6b;
```

### Adding New Languages

1. Create a new JSON file in `src/i18n/locales/`
2. Add translations following the existing structure
3. Update `src/i18n/config.ts` to include the new language


---

**Note**: Remember to replace the placeholder API key with your actual TMDB API key before running the application.
