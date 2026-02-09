import weatherData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const citySearch = document.getElementById('city-search');
    const mainWeatherRoot = document.getElementById('main-weather-root');
    const forecastRoot = document.getElementById('forecast-root');
    const historyContainer = document.getElementById('history-container');
    const modeToggle = document.getElementById('mode-toggle');
    const htmlElement = document.documentElement;
    const currentDateEl = document.getElementById('current-date');
    const greetingText = document.getElementById('greeting-text');

    // State
    let searchHistory = JSON.parse(localStorage.getItem('skycast_history')) || ['London', 'New York'];
    let currentTheme = localStorage.getItem('skycast_theme') || 'light';

    /**
     * Initialize Dashboard
     */
    function init() {
        // Set date
        const now = new Date();
        currentDateEl.textContent = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

        // Dynamic greeting
        const hour = now.getHours();
        if (hour < 12) greetingText.textContent = "Good Morning";
        else if (hour < 18) greetingText.textContent = "Good Afternoon";
        else greetingText.textContent = "Good Evening";

        // Apply theme
        applyTheme(currentTheme);

        // Initial render
        const lastCity = searchHistory[searchHistory.length - 1];
        updateWeather(lastCity.toLowerCase());
        renderHistory();
    }

    /**
     * Update Dashboard with New City Weather
     */
    function updateWeather(cityName) {
        const data = weatherData[cityName];

        if (!data) {
            mainWeatherRoot.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h3>City Not Found</h3>
                    <p style="color: var(--text-secondary);">We only have London, Paris, Tokyo, and New York in this demo.</p>
                </div>
            `;
            forecastRoot.innerHTML = '';
            return;
        }

        // Render Current Weather
        mainWeatherRoot.innerHTML = `
            <div class="current-weather">
                <h1 class="city-name">${data.city}</h1>
                <p class="date-text">Current Conditions</p>
                <div class="temp-display">${data.temp}°C</div>
                <div class="condition-text">${data.condition}</div>
                
                <div class="weather-stats">
                    <div class="stat-item">
                        <div class="stat-icon"><i class="fas fa-droplet"></i></div>
                        <div>
                            <span class="stat-label">Humidity</span>
                            <span class="stat-value">${data.humidity}%</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon"><i class="fas fa-wind"></i></div>
                        <div>
                            <span class="stat-label">Wind Speed</span>
                            <span class="stat-value">${data.wind} km/h</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: flex-end;">
                <i class="fas fa-${data.icon}" style="font-size: 10rem; color: var(--primary); filter: drop-shadow(0 0 30px rgba(79, 70, 229, 0.2));"></i>
            </div>
        `;

        // Render Forecast
        forecastRoot.innerHTML = data.forecast.map(day => `
            <div class="forecast-card">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon"><i class="fas fa-${day.icon}"></i></div>
                <div class="forecast-temp">${day.temp}°C</div>
            </div>
        `).join('');

        // Save to history if not exists
        if (!searchHistory.includes(data.city)) {
            searchHistory.push(data.city);
            if (searchHistory.length > 5) searchHistory.shift();
            localStorage.setItem('skycast_history', JSON.stringify(searchHistory));
            renderHistory();
        }
    }

    /**
     * Render History Sidebar
     */
    function renderHistory() {
        historyContainer.innerHTML = searchHistory.map(city => `
            <div class="history-item" data-city="${city.toLowerCase()}">
                <span><i class="fas fa-location-dot" style="margin-right: 10px;"></i> ${city}</span>
                <i class="fas fa-chevron-right" style="font-size: 0.75rem; opacity: 0.5;"></i>
            </div>
        `).join('');

        // Add history clicks
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => updateWeather(item.dataset.city));
        });
    }

    /**
     * Theme Toggle Logic
     */
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('skycast_theme', theme);

        if (theme === 'dark') {
            document.getElementById('dark-icon').classList.add('active');
            document.getElementById('light-icon').classList.remove('active');
        } else {
            document.getElementById('light-icon').classList.add('active');
            document.getElementById('dark-icon').classList.remove('active');
        }
    }

    // Toggle Click Event
    modeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });

    // Search Event
    citySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateWeather(citySearch.value.toLowerCase().trim());
            citySearch.value = '';
        }
    });

    init();
});
