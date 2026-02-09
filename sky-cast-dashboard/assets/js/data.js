const weatherData = {
    "london": {
        city: "London",
        temp: 12,
        humidity: 65,
        wind: 15,
        condition: "Cloudy",
        icon: "cloud",
        forecast: [
            { day: "Mon", temp: 14, icon: "cloud-sun" },
            { day: "Tue", temp: 11, icon: "cloud-rain" },
            { day: "Wed", temp: 13, icon: "cloud" },
            { day: "Thu", temp: 15, icon: "sun" },
            { day: "Fri", temp: 12, icon: "cloud-rain" }
        ]
    },
    "new york": {
        city: "New York",
        temp: 18,
        humidity: 45,
        wind: 10,
        condition: "Sunny",
        icon: "sun",
        forecast: [
            { day: "Mon", temp: 20, icon: "sun" },
            { day: "Tue", temp: 22, icon: "sun" },
            { day: "Wed", temp: 19, icon: "cloud-sun" },
            { day: "Thu", temp: 17, icon: "cloud" },
            { day: "Fri", temp: 16, icon: "cloud-rain" }
        ]
    },
    "tokyo": {
        city: "Tokyo",
        temp: 22,
        humidity: 70,
        wind: 8,
        condition: "Humid",
        icon: "smog",
        forecast: [
            { day: "Mon", temp: 24, icon: "cloud-sun" },
            { day: "Tue", temp: 25, icon: "cloud-sun" },
            { day: "Wed", temp: 23, icon: "cloud-rain" },
            { day: "Thu", temp: 21, icon: "cloud" },
            { day: "Fri", temp: 22, icon: "sun" }
        ]
    },
    "paris": {
        city: "Paris",
        temp: 15,
        humidity: 55,
        wind: 12,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        forecast: [
            { day: "Mon", temp: 17, icon: "sun" },
            { day: "Tue", temp: 16, icon: "cloud-sun" },
            { day: "Wed", temp: 14, icon: "cloud" },
            { day: "Thu", temp: 13, icon: "cloud-rain" },
            { day: "Fri", temp: 15, icon: "sun" }
        ]
    }
};

export default weatherData;
