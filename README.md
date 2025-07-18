# HackerNews Analyzer Frontend

[Live Preview](https://v43rus.github.io/hn-frontend/)

This project is a modern Vue.js application for analyzing and visualizing Hacker News trends in real-time. Explore trending technology topics, compare multiple tech categories, and discover what's hot in the world of programming, AI, cybersecurity, and more. Built with Vue 3, Chart.js, and a sleek hacker-themed dark interface.

## Features

- **Real-time Trend Analysis:** Interactive charts showing story trends across different time periods with smooth animations.
- **Smart Tag Filtering:** Automatically categorizes stories by technology topics with comparative analysis across multiple categories.
- **Interactive Data Visualization:** Dynamic Chart.js charts with hover effects and responsive design.
- **Backend Pagination:** Efficient pagination system displaying 12 posts per page with optimized database queries.
- **Auto-selected Trending Tags:** Automatically selects the three most trending tags on startup for immediate insights.
- **Responsive Design:** Mobile-friendly interface with adaptive layouts for all screen sizes.
- **Dark Hacker Theme:** Green-on-black cyberpunk aesthetic with glitch effects and matrix-style animations.
- **Real-time Updates:** Hourly automated data scraping ensures fresh content and accurate trends.
- **Cross-platform API:** Seamless integration with Flask backend hosted on Render.com.

## Getting Started

No complex setup required—clone the repository and start the development server with npm.

### To run locally

1. Clone the repository
   ```bash
   git clone https://github.com/v43rus/hn-frontend.git
   cd hn-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### To deploy to GitHub Pages

1. Build for production
   ```bash
   npm run build
   ```

2. Deploy automatically
   ```bash
   npm run deploy
   ```

## Usage

- **Home Page:** Overview of the application with quick navigation links
- **Trends View:** Interactive charts showing story counts over time periods
- **Tags View:** Compare multiple technology categories with auto-selected trending topics
- **Posts View:** Browse paginated posts filtered by tag and time period with direct HackerNews links
- **About Page:** Comprehensive project documentation and developer information

## Technical Implementation

### Core Technologies
- **Vue.js 3:** Modern reactive framework with Composition API for optimal performance
- **Vite:** Lightning-fast development server and optimized production builds
- **Chart.js:** Powerful data visualization library with smooth animations
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development
- **Vue Router:** Client-side routing for seamless single-page application experience

### Key Features
- **Composition API:** Modern Vue 3 patterns for better code organization and reusability
- **Reactive Data Management:** Real-time updates without manual DOM manipulation
- **Component Architecture:** Modular design with reusable components for maintainability
- **API Integration:** Axios-based HTTP client with environment-specific configurations
- **Error Handling:** Comprehensive error boundaries with user-friendly fallback messages
- **Loading States:** Skeleton screens and spinners for optimal user experience

### Performance Optimizations
- **Code Splitting:** Automatic route-based code splitting for faster initial loads
- **Tree Shaking:** Eliminates unused code during build process
- **Asset Optimization:** Compressed images and minified CSS/JS bundles
- **Caching Strategy:** Browser caching for static assets and API responses
- **Lazy Loading:** Components and routes loaded on-demand

## File Structure

```
hn-frontend/
├── public/                    # Static assets
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── components/           # Vue components
│   │   ├── AboutViewContent.vue
│   │   ├── HomeViewContent.vue
│   │   ├── MainNav.vue
│   │   ├── PostsViewContent.vue
│   │   ├── TagItemViewContent.vue
│   │   ├── TagsViewContent.vue
│   │   └── TrendsViewContent.vue
│   ├── router/              # Vue Router configuration
│   │   └── index.js
│   ├── services/            # API services and utilities
│   │   ├── apiClient.js
│   │   └── trendService.js
│   ├── assets/              # Styles and static assets
│   │   ├── glitch.css
│   │   ├── hackerButtons.css
│   │   ├── main.css
│   │   └── matrixRain.css
│   ├── constants/           # Application constants
│   │   ├── periods.js
│   │   └── tags.js
│   ├── views/               # Page-level components
│   │   ├── AboutView.vue
│   │   ├── HomeView.vue
│   │   ├── PostsView.vue
│   │   ├── TagItemView.vue
│   │   ├── TagsView.vue
│   │   └── TrendsView.vue
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── .github/workflows/       # GitHub Actions deployment
│   └── deploy.yml
├── .env.development         # Development environment variables
├── .env.production          # Production environment variables
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## Environment Configuration

### Development
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production
```bash
VITE_API_BASE_URL=https://flask-backend-gtbb.onrender.com/api
```

## Deployment

### Automatic Deployment (GitHub Actions)
- **Trigger:** Push to `main` branch
- **Build:** Node.js 20 with npm ci and Vite build
- **Deploy:** Automatic deployment to GitHub Pages
- **URL:** https://v43rus.github.io/hn-frontend/

### Manual Deployment
```bash
npm run deploy
```

## Browser Compatibility

- **Chrome/Edge:** Full support with optimal Chart.js performance
- **Firefox:** Complete compatibility with all Vue 3 features
- **Safari:** Full support including CSS animations and Tailwind utilities
- **Mobile:** Responsive design optimized for touch interactions

## API Integration

- **Backend:** Flask REST API hosted on Render.com
- **Endpoints:** `/api/trends`, `/api/posts`, `/api/tags`, `/api/scrape`
- **Data Format:** JSON responses with proper error handling
- **CORS:** Configured for cross-origin requests from GitHub Pages

## Development Workflow

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

### Code Quality
- **ESLint:** JavaScript/Vue linting with Vue 3 rules
- **Prettier:** Consistent code formatting
- **Vue DevTools:** Browser extension for Vue debugging
- **Vite DevTools:** Development server with HMR

---

Built with ❤️ using Vue.js 3, Chart.js, Tailwind CSS, and cyberpunk aesthetics. Part of the HackerNews Analyzer ecosystem.
