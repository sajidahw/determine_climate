// geodb api key and host to extract city

export const geodb_api_url = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const geodbApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

// OpenWeather API key

export const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// OpenWeather API URL for relaying weather data
export const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// zipcode OpenWeather API zipcode search conversion to lat/lon
export const OPENWEATHER_API_URL_ZIPCODE_CONVERSION =
  "http://api.openweathermap.org/geo/1.0";

// Google Maps API key and URL
export const googlemaps_api_url = "https://maps.googleapis.com/maps/api/js";
export const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

export const libraries = ["places"];
