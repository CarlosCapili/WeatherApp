async function fetchWeather(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e5382e7ac8f9de055adb99830e13c3f5`, {mode:"cors"});
        const data = await response.json();
        console.log(data);
        return {
            city: `${data.name}, ${data.sys.country}`,
            temp: data.main.temp,
            high: data.main.temp_max,
            low: data.main.temp_min,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            desc: data.weather["0"].description
        };
    } catch (e) {
        console.log("Failed to fetch data from API");
    }
 
}

function kelvinToCel(kelvin) {
    return (kelvin - 273.15);
}

function kelvinToF(kelvin) {
    return ((9/5)*(kelvin - 273.15) + 32);
}

function convertToCelsius(f) {
    return ((f-32)/1.8);
}

function convertToFahrenheit(c) {
    return ((c*1.8)+32)
}

export {
    fetchWeather,
    kelvinToCel,
    kelvinToF,
    convertToCelsius,
    convertToFahrenheit
};