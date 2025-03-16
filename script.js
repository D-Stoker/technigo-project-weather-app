const API_KEY = "01ee167b70b1d72c3a87087dc6fb4f4a";

function getWeather() {
    const city = "Amsterdam";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Current Weather Data:", data);

            // Current weather
            document.getElementById("city").textContent = data.name;
            document.getElementById("temperature").textContent = (data.main.temp - 273.15).toFixed(1);  // Celsius
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = data.main.humidity;
            document.getElementById("wind-speed").textContent = data.wind.speed;

            // Sunrise and Sunset times
            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);
            const sunriseFormatted = sunriseTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
            const sunsetFormatted = sunsetTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

            document.getElementById("sunrise").textContent = `Sunrise: ${sunriseFormatted}`;
            document.getElementById("sunset").textContent = `Sunset: ${sunsetFormatted}`;
        })
        .catch(error => console.error("Error fetching current weather:", error));

    // Fetch 5-day forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log("5-Day Forecast Data:", data);

            // Forecast data
            const forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = "";  // Clear previous forecast

            // Loop through the 5-day forecast and display each day's data
            for (let i = 0; i < data.list.length; i += 8) {  // 8 items every day (3-hour intervals)
                const forecast = data.list[i];

                const forecastDate = new Date(forecast.dt * 1000);
                const forecastTemp = (forecast.main.temp - 273.15).toFixed(1);  // Celsius
                const forecastDesc = forecast.weather[0].description;

                const forecastElement = document.createElement("section");
                forecastElement.classList.add("forecast-day");

                forecastElement.innerHTML = `
                    <h3>${forecastDate.toLocaleDateString()}</h3>
                    <p>Temp: ${forecastTemp}°C</p>
                    <p>Condition: ${forecastDesc}</p>
                `;

                forecastContainer.appendChild(forecastElement);
            }
        })
        .catch(error => console.error("Error fetching forecast:", error));
}

getWeather();
