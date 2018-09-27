const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'a664c14259dd6536050a74ce3f5bff49';
const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/`;
const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`;
const ADDRESS_API_URL = `${proxy}https://darksky.net/rgeo?hires=1`;

function getCoordinates(location) {
  return fetch(`${GEO_API_URL}${location}`)
    .then(response => response.json());
}

function getAddress(lat, lng) {
  return fetch(`${ADDRESS_API_URL}&lat=${lat}&lon=${lng}`)
    .then(response => response.json());
}

function getWeather(lat, lng) {
  return fetch(`${WEATHER_API_URL}${lat},${lng}`)
    .then(response => response.json());
}

function getEmbedURL(lat, lng) {
  return `https://maps.darksky.net/@temperature,${lat},${lng},11?domain="+encodeURIComponent(window.location.href)+"&auth=1525213550_b5fc128e7789bb56048952cc704c8473&embed=true&amp;timeControl=false&amp;fieldControl=false&amp;defaultField=temperature&defaultUnits=_f`;
}

export default {
  getEmbedURL,
  getWeather,
  getCoordinates,
  getAddress,
};
