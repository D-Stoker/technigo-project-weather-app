function getWeather() {
    const apiKey = "5b1144929b9604bfdbbe487f80919fbb"; // Openweather API key
    const city = "Amsterdam"; // Nearest major local city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log("Weather Data:", data); --> save for later

            // Extract relevant data
            const cityName = data.name;
            const tempCelsius = (data.main.temp - 273.15).toFixed(1); // Convert to °C
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);
            const sunriseFormatted = sunriseTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
            const sunsetFormatted = sunsetTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

            // Update HTML elements
            document.getElementById("city").textContent = cityName;
            document.getElementById("temperature").textContent = tempCelsius;
            document.getElementById("description").textContent = weatherDescription;
            document.getElementById("humidity").textContent = humidity;
            document.getElementById("wind-speed").textContent = windSpeed;

            document.getElementById("sunrise").innerText = `Sunrise: ${sunriseFormatted}`;
            document.getElementById("sunset").innerText = `Sunset: ${sunsetFormatted}`;

        })
        .catch(error => {
            console.error("Fetch error:", error.message); // More concise error logging
        });
}

getWeather(); // Run the function
