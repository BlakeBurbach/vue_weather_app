const proxy = 'https://cors-anywhere.herokuapp.com/';

const API_KEY = 'a664c14259dd6536050a74ce3f5bff49';

const location = '37.8267,-122.4233';

const API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${location}`;

const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`;

function getCoordinates(location) {
  return fetch(`${GEO_API_URL}${location}`)
    .then(response => response.json());
}

function getWeather() {
  return fetch(API_URL)
    .then(response => response.json());
}

export default {
  getWeather,
  getCoordinates,
};
