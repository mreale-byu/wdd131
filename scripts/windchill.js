
/** Function to calculate the wind chill based on temperature in Celsius and wind speed in km/h */
const calculateWindChill = (temperatureCelsius , windSpeed) => {
    return 13.12 + 0.6215 * temperatureCelsius - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperatureCelsius * Math.pow(windSpeed, 0.16);
}

const TEMPERATURE_CELSIUS = 25; // Example temperature in Celsius
const WIND_SPEED = 10; // Example wind speed in km/h

var windChill = document.getElementById("windChill");

if (TEMPERATURE_CELSIUS <= 10 && WIND_SPEED > 4.8) {
    windChill.textContent = calculateWindChill(TEMPERATURE_CELSIUS, WIND_SPEED).toFixed(2) + "°C";
} else {
    windChill.textContent = "N/A";
}


