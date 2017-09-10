function parseMonth(monthNumber){
  switch (monthNumber) {
    case 0:
      return "Января"
    case 1:
      return "Февраля"
    case 2:
      return "Марта"
    case 3:
      return "Апреля"
    case 4:
      return "Мая"
    case 5:
      return "Июня"
    case 6:
      return "Июля"
    case 7:
      return "Августа"
    case 8:
      return "Сентября"
    case 9:
      return "Октября"
    case 10:
      return "Ноября"
    case 11:
      return "Декабря"
    default:
      return false
  }
}

function parseWeekDay(weekNumber){
  switch (weekNumber) {
    case 0:
      return "воскресенье"
    case 1:
      return "понедельник"
    case 2:
      return "вторник"
    case 3:
      return "среда"
    case 4:
      return "четверг"
    case 5:
      return "пятница"
    case 6:
      return "суббота"
    default:
      return false
  }
}

export {
  parseMonth,
  parseWeekDay
}
