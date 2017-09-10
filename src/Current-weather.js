import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { parseMonth, parseWeekDay } from './Helper-function';

class CurrentWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: ''
    }
  }

  componentWillMount(){
    let date = new Date();
    let dayNumber = date.getDate();
    let day = parseWeekDay(date.getDay());
    let year = date.getFullYear();
    let time = date.getHours() + ':' + date.getMinutes();
    let month = parseMonth(date.getMonth());
    let textDate = `${day}, ${dayNumber} ${month} ${year}, ${time}`;

    this.setState({
      date: textDate
    })
  }

  render() {
    let currWeather = this.props.weather.currentWeather[0];
    return (
      <div className="current-weather">
        <Header className="current-weather__city">{currWeather.city}</Header>
        <p className="current-weather__date">сегодня {this.state.date}</p>
        <p className="current-weather__temp">{currWeather.temp}°</p>
      </div>
    )
  }
}

export default connect(
  state => ({
    weather: state
  }))(CurrentWeather)
