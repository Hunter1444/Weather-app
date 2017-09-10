import React, { Component } from 'react';
import './App.css';
import CurrentWeather from './Current-weather.js';
import CityList from './City-list.js';
import Loader from './Loader.js';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.getUserCoord()
  }

  getUserCoord(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
      }
    }

  showPosition(position) {
    let coord = {lat: position.coords.latitude, lng: position.coords.longitude};

    this.LoadCurrentWeather(`http://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lng}&APPID=f01147f0dd250f5d90a8de4ebd80f724`);
  }

  LoadCurrentWeather(url){
    let that = this;

    fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      that.CurrentWeather(response)
    })
  }

  CurrentWeather(info){
    this.props.CurrentWeather(info)
  }

  render() {
    if(this.props.weather.currentWeather.length === 0){
      return(
        <Loader/>
      )
    } else{

      return (
        <Container className="App">
          <CurrentWeather/>
          <CityList/>
        </Container>
      )
    }
  }
}

export default connect(
  state => ({
    weather: state
  }),
  dispatch => ({
    CurrentWeather: (info) =>{
      let city = info.name;
      let temp = (Math.round(info.main.temp) - 273);
      if(temp > 0) temp = `+${temp}`;
      let weatherInfo = {
        temp,
        city
      }
      dispatch({ type: 'CURRENT_CITY_USER', payload: weatherInfo});
    }
  }))(App)
