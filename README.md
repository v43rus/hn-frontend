# HackerNews Analyzer Frontend

A modern Vue.js application for analyzing and visualizing Hacker News trends. This frontend provides an intuitive interface for exploring trending topics, viewing popular posts, and understanding technology trends over time.

## 🚀 Live Demo

- **Production**: [https://v43rus.github.io/hn-frontend/](https://v43rus.github.io/hn-frontend/)
- **Backend API**: [https://flask-backend-gtbb.onrender.com](https://flask-backend-gtbb.onrender.com)

## 🛠️ Tech Stack

- **Vue 3** with Composition API
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **Vue Router** for navigation
- **Axios** for API communication

## 📦 Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Deploy to GitHub Pages

```sh
npm run deploy
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://v43rus.github.io/hn-frontend/`

### Manual Deployment

```sh
npm install gh-pages --save-dev
npm run deploy
```

## 🔧 Configuration

### Environment Variables

- **Development**: `.env.development`

  ```
  VITE_API_BASE_URL=http://localhost:5000/api
  ```

- **Production**: `.env.production`
  ```
  VITE_API_BASE_URL=https://flask-backend-gtbb.onrender.com/api
  ```

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will handle the rest automatically

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── AboutViewContent.vue
│   ├── HomeViewContent.vue
│   ├── PostsViewContent.vue
│   ├── TagsViewContent.vue
│   ├── TrendsViewContent.vue
│   └── MainNav.vue
├── router/              # Vue Router configuration
├── services/            # API services
├── assets/              # Static assets and styles
└── views/               # Page components
```

## 🎨 Features

- **Real-time Trend Analysis**: Interactive charts showing story trends
- **Tag-based Filtering**: Filter stories by technology categories
- **Responsive Design**: Mobile-friendly interface
- **Dark Theme**: Hacker-inspired green-on-black aesthetic
- **Pagination**: Efficient browsing of large datasets
- **Data Visualization**: Beautiful charts with Chart.js

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Related

- [Backend Repository](https://github.com/v43rus/flask-backend)
- [Developer Portfolio](https://v43rus.github.io/portfolio)

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
