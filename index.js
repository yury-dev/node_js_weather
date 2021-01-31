const express = require('express')
const bodyParser=require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express()
//1122f0798f082a6e27a2c896df578ce7    https://home.openweathermap.org/api_keys

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) =>{
  res.render('index', {
    place: null,
    date: new Date(),
    weather: null,
    error: null
  })
})

app.post('/', async (req, res) => {
  const {city} = req.body
  
  const {place, date, weather, error} = await weatherRequest(city)
  // console.log('Weather:', weather)
// console.log('Error:', error)
  res.render('index', {place, date, weather, error})
})

app.listen(4000, ()=>{
  console.log("Server has started on port 4000 ...")
})