const rp = require('request-promise')

module.exports = async function (city = '') {
  if (!city) {

    throw new Error("Имя города не может быть пустым")

  }
  const KEY = '1122f0798f082a6e27a2c896df578ce7'
  const uri = 'http://api.openweathermap.org/data/2.5/weather?&lang=ru'

  const options = {
    uri,
    qs:{
      appid: KEY,
      q: city,
      units: 'metric'
      
    },
    json: true
  }
  try{
const data = await rp(options)
// console.log(data)
return{
  date: new Date(),
  place:`${data.name}`,
  weather: ` Температура: ${data.main.temp}C, *ощущается как: ${data.main.feels_like}C; Давление: ${data.main.pressure} Па; Осадки: ${data.weather[0].description}`,
  error: null
}
  }catch(error){
    return{
      weather: null,
      error: error.error.message
    }

  }

  
}