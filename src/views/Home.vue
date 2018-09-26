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
          <div class='card-header'>Current Weather</div>
            <div class='card-body text-center'>
              <h4 class='card-title'>{{forecast.currently.summary}}</h4>
              <div class='card-text'>
                <skycon v-bind:condition='forecast.currently.icon | uppercase'></skycon>
                <span class='temp-text'>{{forecast.currently.temperature}} ℉</span>
              </div>
              <div class='card-text'>
                {{forecast.currently.precipProbability}}％ chance of precipitation
              </div>
            </div>
          </div>
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
      location: '',
      forecast: null,
    };
  },
  // when page loads, call the getWeather function from API
  mounted() {
    API.getWeather().then((result) => {
      console.log(result);
      this.forecast = result;
    });
  },
  methods: {
    updateLocation() {
      API.getCoordinates(this.location).then((result) => {
        console.log(result);
      });
    },
  },
  filters: {
    uppercase: v => v.toUpperCase().replace(/-/g, '_'),
  },
};
</script>

<style>
.temp-text {
  font-size: 2em;
}
</style>
