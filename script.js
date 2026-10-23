const offlineMessage = document.getElementById("offline");
const onlineMessage = document.getElementById("container");

function checkConnection(){
    if (navigator.onLine){
        offlineMessage.classList.add("hidden");}
    else{
            offlineMessage.classList.remove("hidden");
            onlineMessage.classList.add("hidden");
            document.body.style.backgroundColor = "white";
        }
    }
    
checkConnection();
window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);

function City(){
    let input = document.getElementById("cityinput");
    let city = input.value;
    let cityName = document.getElementById("cityname");
    let png = document.getElementById("icon");
    const now = new Date();
    const hours = now.getHours();
    cityName.innerHTML = city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6462fcae5aba613654a41a6ebe6eea7a&units=metric`;
    console.log(url);
    fetch(url)

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log(data);
    // console.log(data.main.temp);
    // console.log(data.main.humidity);
    // console.log(data.main.feels_like);
    // console.log(data.main.pressure);

    document.getElementById("temp").innerText =    `${data.main.temp}℃`
    document.getElementById("humidity").innerText =    `Humidity: ${data.main.humidity}`
    document.getElementById("feel").innerText =    `Feels like: ${data.main.feels_like}℃`
    document.getElementById("wind").innerText =    `${data.weather[0].description}`
    let icon = data.weather[0].icon;
    
    if (hours >= 18 && hours <= 5){
        document.body.style.backgroundColor = "rgb(9, 1, 72)";
    }
    else{
        document.body.style.backgroundColor = "rgb(15, 194, 243)";
    }

    console.log(icon);
    if (icon == "01d"){
        png.src = "sun (1)";
    }
    else if (icon == "01n"){
        png.src = "images/night-mode.png";
    }
    else if (icon == "02d"){
        png.src = "images/cloudy.png";
    }
    else if (icon == "02n"){
        png.src = "images/cloudy-night.png";
    }
    else if (icon == "10d" || icon == "10n" || icon == "09d" || icon == "09n"){
        png.src = "images/heavy-rain.png";
    }
    else if (icon == "11d" || icon == "11n"){
        png.src = "images/storm.png";
    }
    else if (icon == "03d" || icon == "03n" || icon == "04d" || icon == "04n"){
        png.src = "images/cloud (1).png";
    }
    else if (icon == "50d" || icon == "50n"){
        png.src = "images/fog.png";
    }
    else if (icon == "13d" || icon == "13n"){
         png.src = "images/snowy.png";
    }
    else{
        png.src = "";
    }


    

    
})
}
