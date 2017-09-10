export default function currentWeather(state = [], action){
  if(action.type === "CURRENT_CITY_USER"){
    return  [
      ...state,
      action.payload
    ]
  } else{
    return state
  }
}
