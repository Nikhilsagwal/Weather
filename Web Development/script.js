const offlineMessage = document.getElementById("offline");
const appContainer = document.getElementById("container");
const reading = document.getElementById("reading");
const statusMessage = document.getElementById("status");
const form = document.getElementById("searchform");

// NOTE: this key is visible to anyone who opens the page. Fine for practice,
// but don't publish this file with a key you care about.
const API_KEY = "6462fcae5aba613654a41a6ebe6eea7a";

function checkConnection() {
    if (navigator.onLine) {
        offlineMessage.classList.add("hidden");
        appContainer.classList.remove("hidden");
    } else {
        offlineMessage.classList.remove("hidden");
        appContainer.classList.add("hidden");
    }
}

checkConnection();
window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);

// Local icons first; if a file is missing, fall back to OpenWeather's own icon.
const localIcons = {
    "01d": "images/sun (1).png",
    "01n": "images/night-mode.png",
    "02d": "images/cloudy.png",
    "02n": "images/cloudy-night.png",
    "03": "images/cloud (1).png",
    "04": "images/cloud (1).png",
    "09": "images/heavy-rain.png",
    "10": "images/heavy-rain.png",
    "11": "images/storm.png",
    "13": "images/snowy.png",
    "50": "images/fog.png"
};

function pickLocalIcon(icon) {
    return localIcons[icon] || localIcons[icon.slice(0, 2)] || "";
}

function pickSky(icon) {
    const code = icon.slice(0, 2);
    const night = icon.endsWith("n");
    if (code === "01") return night ? "clear-night" : "clear-day";
    if (code === "02" || code === "03" || code === "04") return night ? "cloudy-night" : "cloudy";
    if (code === "09" || code === "10") return "rain";
    if (code === "11") return "storm";
    if (code === "13") return "snow";
    if (code === "50") return "mist";
    return night ? "clear-night" : "clear-day";
}

function showStatus(message) {
    reading.classList.add("hidden");
    statusMessage.textContent = message;
    statusMessage.classList.remove("hidden");
}

function City() {
    const city = document.getElementById("cityinput").value.trim();
    if (!city) return;

    const png = document.getElementById("icon");
    showStatus("Loading…");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (Number(data.cod) !== 200) {
                showStatus(`Couldn't find "${city}". Check the spelling and try again.`);
                return;
            }

            const icon = data.weather[0].icon;

            document.getElementById("cityname").textContent = data.name || city;
            document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}°<small>C</small>`;
            document.getElementById("wind").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = `${data.main.humidity}%`;
            document.getElementById("feel").textContent = `${Math.round(data.main.feels_like)}°C`;

            document.body.dataset.sky = pickSky(icon);

            png.onerror = function () {
                png.onerror = null;
                png.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
            };
            png.alt = data.weather[0].description;
            png.src = pickLocalIcon(icon) || `https://openweathermap.org/img/wn/${icon}@4x.png`;

            statusMessage.classList.add("hidden");
            reading.classList.remove("hidden");
        })
        .catch(function () {
            showStatus("Couldn't load the weather. Check your connection and try again.");
        });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    City();
});
