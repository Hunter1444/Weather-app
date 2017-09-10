function getLocalStorageCities(){
  let cityList = localStorage.getItem('cityList');

  if(cityList !== null){
    cityList = JSON.parse(cityList);
    cityList.forEach(function(item, index){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item.city}&APPID=f01147f0dd250f5d90a8de4ebd80f724`)
      .then(function(response){
        return response.json()
      })
      .then(function(response){
        let temp = (Math.round(response.main.temp) - 273);
        if (temp > 0) temp = `+${temp}`;

        item.temp = temp;
      })
    });
  }

  if(cityList === null){
    return []
  } else{
    return cityList
  }
}

export default function cityList(state = getLocalStorageCities(), action){
  if(action.type === "CITY_LIST_ADD"){
    return [
      ...state,
      action.payload
    ]
  } else if(action.type === "CITY_LIST_REMOVE"){
    let array = state;
    array.forEach(function(item, index){
      if(item.city === action.payload){
        let index = array.indexOf(item);
        array.splice(index, 1);
      }
    })
    return array
  } else{
    return state
  }
}
