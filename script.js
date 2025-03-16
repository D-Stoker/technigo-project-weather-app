console.log("script.js loaded successfully");  // Check if the script is loaded

function getWeather() {
    console.log("getWeather function called");  // Debugging line
    const city = "Amsterdam";  // Or dynamically set the city here
    const apiKey = "01ee167b70b1d72c3a87087dc6fb4f4a";  // Use your actual API key

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Current Weather Data:", data); // Make sure this log appears in the console
            // Update page with the current weather data
            document.getElementById("city").textContent = data.name;
            document.getElementById("temperature").textContent = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = data.main.humidity;
            document.getElementById("wind-speed").textContent = data.wind.speed;

            // Sunrise and Sunset times
            const sunriseTime = new Date(data.sys.sunrise * 1000); // Convert from Unix timestamp to JS Date
            const sunsetTime = new Date(data.sys.sunset * 1000);
            const sunriseFormatted = sunriseTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
            const sunsetFormatted = sunsetTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

            document.getElementById("sunrise").textContent = `Sunrise: ${sunriseFormatted}`;
            document.getElementById("sunset").textContent = `Sunset: ${sunsetFormatted}`;
        })
        .catch(error => console.error("Error fetching current weather:", error));

    // Fetch forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log("5-Day Forecast Data:", data);
            // Update page with the forecast data
        })
        .catch(error => console.error("Error fetching forecast:", error));
}
