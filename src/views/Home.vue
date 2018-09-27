<template>
  <div class='home'>
    <div class='row'>
      <div class='col-6 offset-3'>
        <div class='input-group mb-3'>
          <input v-model='location' type='text' class='form-control' placeholder='Enter Location'
           aria-label='Enter Location' aria-describedby='button-addon2'>
          <div class='input-group-append'>
            <button @click='updateLocation' class='btn btn-outline-secondary' type='button'
            id='button-addon2'>Search</button>
          </div>
        </div>
      </div>
      <div class=' col-6 offset-3' v-if='forecast'>
        <div class='card text-white bg-primary mb-3'>
          <div class='card-header header__title'>
            <strong>Current Weather</strong> - {{address}}</div>
            <div class='card-body text-center'>
              <h4 class='card-title'>{{forecast.currently.summary}}</h4>
              <div class='card-text'>
                <span class='temp-icon'>{{icons[forecast.currently.icon]}} </span>
                <span class='temp-text'>{{forecast.currently.temperature}} ℉</span>
              </div>
              <div class='card-text'>
                {{forecast.currently.precipProbability}}％ chance of precipitation
              </div>
            </div>
          </div>
      </div>
      <div class="col-8 offset-2">
        <iframe
          id="map-embed-iframe"
          frameborder="0"
          height="500px"
          width="100%"
          :src='embedURL'></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/lib/API';
import Vue from 'vue';
import VueSkycons from 'vue-skycons';

// or pass the color option
Vue.use(VueSkycons, { color: 'white' });

export default {
  name: 'home',
  components: {},
  data() {
    return {
      embedURL: '',
      location: localStorage.location || '',
      address: localStorage.address || '',
      forecast: null,
      icons: {
        'clear-day': '☀️ ',
        'clear-night': '🌕 ',
        rain: '💦 ',
        snow: '❄️ ',
        sleet: '💦❄️ ',
        wind: '💨 ',
        fog: '🌫 ',
        cloudy: '☁️ ',
        'partly-cloudy-day': '⛅️ ',
        'partly-cloudy-night': '☁️ 🌕 ',
      },
    };
  },
  // when page loads, call the getWeather function from API
  mounted() {
    this.loadWeather(localStorage.lat || '37.8267', localStorage.lng || '-122.4233');
  },
  methods: {
    loadWeather(lat, lng) {
      localStorage.lat = lat;
      localStorage.lng = lng;

      this.embedURL = API.getEmbedURL(lat, lng);

      API.getAddress(lat, lng).then((result) => {
        this.address = result.name;
        localStorage.address = this.address;
      });
      API.getWeather(lat, lng).then((result) => {
        this.forecast = result;
      });
    },
    updateLocation() {
      API.getCoordinates(this.location).then((result) => {
        localStorage.location = this.location;
        this.loadWeather(result.latitude, result.longitude);
      });
    },
  },
};
</script>

<style>
.temp-text {
  font-size: 2em;
}

.temp-icon {
  font-size: 5em;
}

.header__title {
  font-size: 1.5em;
  text-align: center;
}
</style>
