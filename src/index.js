import * as fData from "./fetchData";

const search_bar_text = document.getElementById("search-bar-text");
const search_bar_btn = document.getElementById("search-bar-btn");

//Display divs
const displayCity = document.getElementById("city");
const displayTemp = document.getElementById("temp");
const displayHigh = document.getElementById("high");
const displayLow = document.getElementById("low");
const displayFeelsLike = document.getElementById("feelsLike");
const displayHumidity = document.getElementById("humidity");
const displayDesc = document.getElementById("desc");
const convertDiv = document.getElementById("convert");


//Search when button or enter key is pressed
search_bar_btn.addEventListener("click", () => {
    getWeather();
}); 

//Enables user to press enter on keyboard rather than click button
search_bar_text.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        search_bar_btn.click();
    }
});

//When the degree converter is clicked switch the active class to the opposite deg
convertDiv.addEventListener("click", () => {
    const degPara = document.getElementsByClassName("convert");
    
    if (degPara[0].classList.contains("active")) {
        //Convert to F
        degPara[1].classList.add("active");
        degPara[0].classList.remove("active");
       
        displayData(Math.round(fData.convertToFahrenheit(displayTemp.textContent.slice(0,-1))), displayTemp);
        displayData(Math.round(fData.convertToFahrenheit(displayHigh.textContent.slice(6,-1))), displayHigh);
        displayData(Math.round(fData.convertToFahrenheit(displayLow.textContent.slice(5,-1))), displayLow);
        displayData(Math.round(fData.convertToFahrenheit(displayFeelsLike.textContent.slice(12,-1))), displayFeelsLike);
        
    } else {
        //Convert to C
        degPara[0].classList.add("active");
        degPara[1].classList.remove("active");

        displayData(Math.round(fData.convertToCelsius(displayTemp.textContent.slice(0,-1))), displayTemp);
        displayData(Math.round(fData.convertToCelsius(displayHigh.textContent.slice(6,-1))), displayHigh);
        displayData(Math.round(fData.convertToCelsius(displayLow.textContent.slice(5,-1))), displayLow);
        displayData(Math.round(fData.convertToCelsius(displayFeelsLike.textContent.slice(12,-1))), displayFeelsLike);
    }
});

//Set default weather to Toronto on first display
(function defaultWeather() {
    search_bar_text.value = "Toronto";
    search_bar_btn.click();
})();

//Get the data and place them in vars
async function getWeather() {
    try {
        const data = await fData.fetchWeather(search_bar_text.value);
        //console.log(data);
        const city = data.city;
        const temp = Math.round(fData.kelvinToCel(data.temp));
        const high = Math.round(fData.kelvinToCel(data.high));
        const low = Math.round(fData.kelvinToCel(data.low));
        const feelsLike = Math.round(fData.kelvinToCel(data.feelsLike));
        const humidity = data.humidity;
        const desc = data.desc;
        
        console.log(city);
        console.log(temp);
        console.log(high);
        console.log(low);
        console.log(feelsLike);
        console.log(humidity);
        console.log(desc);
       
        displayData(city, displayCity);
        displayData(temp, displayTemp);
        displayData(high, displayHigh);
        displayData(low, displayLow);
        displayData(feelsLike, displayFeelsLike);
        displayData(humidity, displayHumidity);
        displayData(desc, displayDesc);
    } catch (e) {
        console.log("Data failed to fetch from fetchData.js");
    }
}

//Display functions
function displayData(data, displayDiv) {
    const degreeList = ["temp", "high", "low", "feelsLike"];
    if (degreeList.includes(displayDiv.id)) {
        let text = "";

        if (displayDiv.id === "high") {
            text += "High: ";
        }
        if (displayDiv.id === "low") {
            text += "Low: ";
        }
        if (displayDiv.id === "feelsLike") {
            text += "Feels Like: "; 
        } 

        text += `${data}℃`;
        displayDiv.textContent = text;

    } else if (displayDiv.id === "humidity") {
        displayDiv.textContent = `Humidity: ${data}%`;
    } else {
        displayDiv.textContent = data;
    }
}

