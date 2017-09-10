import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react';

class CityList extends Component{

  removeCity(e){
    e.preventDefault();
    let city = e.target.parentElement.querySelector('.city-list__city').textContent;
    this.props.removeCity(city);
    e.target.closest('li').remove()
  }

  addCity(e){
    e.preventDefault();
    let input = this.refs.cityInput;
    this.getCityTemp(input.value)
    input.value = '';
  }

  cityAlreadyOnList(city){
    let bool = this.props.weather.cityList.some(function(item, index){
      return item.city === city;
    })
    return bool;
  }

  getCityTemp(city){
    let that = this;

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f01147f0dd250f5d90a8de4ebd80f724`)
      .then(function(response){
        return response.json()
      })
      .then(function(response){
        if(that.cityAlreadyOnList(response.name) === false){
          let temp = (Math.round(response.main.temp) - 273);
          let city = response.name
          if (temp > 0) temp = `+${temp}`;

          that.props.cityList({
            city,
            temp
          });
        } else{
          alert('Город уже в списке')
        }
      })
      .catch(function(error){
        console.error(error);
        alert('Такого города не существует')
      })

    }


  render(){
    let that = this;
    let cities = this.props.weather.cityList.map(function(item, index){
      return(
        <li key={index}>
          <span onClick={that.removeCity.bind(that)} className="city-list__remove">Убрать</span>
          <span className="city-list__city">{item.city}</span><br/>
          <span className="city-list__temp">{item.temp}°</span>
        </li>
      )
    })
    return(
      <div className="city-list">
        <List>{cities}</List>
        <form className="addCity__form" onSubmit={this.addCity.bind(this)}>
          <input type="text" ref="cityInput" placeholder="Добавить город"/>
          <Button type="submit">Добавить</Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({
    weather: state
}),
dispatch => ({
  cityList: (cities) =>{
    dispatch({ type: 'CITY_LIST_ADD', payload: cities});
  },
  removeCity: (city) =>{
    dispatch({ type: 'CITY_LIST_REMOVE', payload: city});
  },
}))(CityList)
