const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "1218d528a10ecaffe6c6592d82b3f44d";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the name.");
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        }
        const data = await response.json();

        // Update the UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Set the weather icon based on the condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "/images/cloudy gggg.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "/images/sunny.webp";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./images/rain ioio.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "/images/frezzing.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "/images/mons.svg";
        } else {
            weatherIcon.src = "/images/default.png"; // Fallback for unexpected weather
        }
           
        // Show the weather container
        // weatherContainer.style.display = "block";
    } catch (error) {
        console.error(error);
        alert(error.message); // Show specific error message
    }
}

// Add event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    weatherContainer.style.display = "block";
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Initial call with default city
checkWeather("Bangalore");
