<template>
  <div
    class="w-full max-w-6xl mx-auto p-6! bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center md:text-left space-y-4!"
  >
    <div class="text-center space-y-4">
      <h1 class="text-3xl md:text-4xl font-bold text-green-400 font-mono">HackerNews Analyzer</h1>
      <p class="text-green-400/80 text-lg font-mono">A Full-Stack Data Analytics Platform</p>
    </div>

    <!-- Application Overview -->
    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-green-400 border-b border-green-500/30 pb-2!">
          🚀 Application Overview
        </h2>
        <p class="text-sm md:text-base text-green-100/90 leading-relaxed p-1!">
          This sophisticated web application continuously monitors
          <a
            href="https://news.ycombinator.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-green-400 hover:text-green-300 underline transition-colors"
          >
            Hacker News
          </a>
          to extract and analyze trending technology topics. It scrapes posts 24x a day, categorizes
          them by tech tags, and provides real-time insights into what's hot in the world of
          <strong>technology</strong>, <strong>cybersecurity</strong>, and
          <strong>programming</strong>.
        </p>
        <p class="text-sm md:text-base text-green-100/90 leading-relaxed p-1!">
          Users can explore tag-based trends over time, compare multiple technologies, view the most
          popular posts by category and time period, and dive into historical data to understand
          tech evolution patterns.
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-bold text-green-400 border-b border-green-500/30 pb-2!">
          🛠️ Development Tools & Process
        </h2>
        <div class="space-y-3 p-1!">
          <div class="flex justify-center md:justify-start gap-3">
            <span class="text-green-400">▲</span>
            <span class="text-sm"
              ><strong>Postman</strong> - API endpoint testing and development</span
            >
          </div>
          <div class="flex justify-center md:justify-start gap-3">
            <span class="text-green-400">▲</span>
            <span class="text-sm"
              ><strong>pgAdmin4</strong> - PostgreSQL database management and queries</span
            >
          </div>
          <div class="flex justify-center md:justify-start gap-3">
            <span class="text-green-400">▲</span>
            <span class="text-sm"><strong>VS Code</strong> - Primary development environment</span>
          </div>
          <div class="flex justify-center md:justify-start gap-3">
            <span class="text-green-400">▲</span>
            <span class="text-sm"><strong>Git</strong> - Version control and collaboration</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Architecture & Tech Stack -->
    <div class="space-y-4!">
      <h2 class="text-xl font-bold text-green-400 border-b border-green-500/30 pb-2!">
        🏗️ Architecture & Tech Stack
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-black/30 border border-green-500/30 rounded-md p-2!">
          <h3 class="font-bold text-green-400 mb-3">Frontend</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Vue 3</strong> with Composition API</li>
            <li>• <strong>Vite</strong> for fast development</li>
            <li>• <strong>Tailwind CSS</strong> for styling</li>
            <li>• <strong>Chart.js</strong> for data visualization</li>
            <li>• <strong>Vue Router</strong> for navigation</li>
          </ul>
        </div>
        <div class="bg-black/30 border border-green-500/30 rounded-md p-2!">
          <h3 class="font-bold text-green-400 mb-3">Backend</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>Flask</strong> web framework</li>
            <li>• <strong>PostgreSQL</strong> database</li>
            <li>• <strong>BeautifulSoup</strong> for web scraping</li>
            <li>• <strong>psycopg2</strong> database adapter</li>
            <li>• <strong>RESTful API</strong> architecture</li>
          </ul>
        </div>
        <div class="bg-black/30 border border-green-500/30 rounded-md p-2!">
          <h3 class="font-bold text-green-400 mb-3">DevOps</h3>
          <ul class="space-y-2 text-sm">
            <li>• <strong>GitHub Actions</strong> CI/CD</li>
            <li>• <strong>Render.com</strong> deployment</li>
            <li>• <strong>Docker</strong> containerization</li>
            <li>• <strong>Environment variables</strong></li>
            <li>• <strong>Automated testing</strong></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Deployment Pipeline -->
    <div class="space-y-4!">
      <h2 class="text-xl font-bold text-green-400 border-b border-green-500/30 pb-2!">
        🔄 Deployment Pipeline
      </h2>
      <div class="bg-black/30 border border-green-500/30 rounded-md p-2!">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            <span class="text-sm font-mono">GitHub Push</span>
          </div>
          <div class="text-green-400">→</div>
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            <span class="text-sm font-mono">GitHub Actions</span>
          </div>
          <div class="text-green-400">→</div>
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            <span class="text-sm font-mono">Render.com Deploy</span>
          </div>
        </div>
        <p class="text-sm text-green-100/80 mt-4">
          Continuous integration and deployment pipeline ensures code quality and seamless updates.
          Every commit triggers automated deployment to production.
        </p>
      </div>
    </div>

    <!-- Key Features -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold text-green-400 border-b border-green-500/30 pb-2!">
        ✨ Key Features
      </h2>
      <div class="grid md:grid-cols-2 gap-4 p-1!">
        <div class="space-y-2">
          <h3 class="font-bold text-green-400">Data Collection</h3>
          <ul class="text-sm space-y-1">
            <li>• Automated HackerNews scraping</li>
            <li>• Real-time tag extraction</li>
            <li>• Historical data preservation</li>
            <li>• Intelligent categorization</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="font-bold text-green-400">Analytics & Visualization</h3>
          <ul class="text-sm space-y-1">
            <li>• Interactive trend charts</li>
            <li>• Multi-tag comparison</li>
            <li>• Paginated post browsing</li>
            <li>• Time-based filtering</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Credits & Links -->
    <div class="bg-green-500/10 border border-green-500/30 rounded-md p-2!">
      <h2 class="text-xl font-bold text-green-400 m-4! text-center">🙏 Credits & Links</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-sm text-green-100/80 mb-3">Data Source</p>
          <a
            href="https://news.ycombinator.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="hacker-button inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105"
          >
            <span class="text-orange-400">Y</span>
            <span>Hacker News</span>
          </a>
        </div>
        <div class="text-center">
          <p class="text-sm text-green-100/80 mb-3">Source Code</p>
          <a
            href="https://github.com/v43rus/hn-frontend"
            target="_blank"
            rel="noopener noreferrer"
            class="hacker-button inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div class="text-center">
          <p class="text-sm text-green-100/80 mb-3">Developer</p>
          <a
            href="https://leonardjensen.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hacker-button inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105"
          >
            <span class="text-blue-400">⚡</span>
            <span>Portfolio</span>
          </a>
        </div>
        <div class="text-center">
          <p class="text-sm text-green-100/80 mb-3">Built With</p>
          <a
            href="https://open.spotify.com/playlist/4YKlvoOeAMTyJfuJMbs9mx?si=72c702f640ca408e"
            target="_blank"
            rel="noopener noreferrer"
            class="hacker-button inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105"
            title="Coding playlist that fueled this project"
          >
            <span class="text-green-400">🎵</span>
            <span>Beats</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Note -->
    <div class="md:hidden bg-red-500/10 border border-red-500/30 rounded-md p-4">
      <p class="text-sm text-red-400">
        📱 <strong>Mobile Tip:</strong> For chart interaction, use tap and hold with scroll instead
        of quick taps to view individual data points.
      </p>
    </div>
  </div>
</template>
