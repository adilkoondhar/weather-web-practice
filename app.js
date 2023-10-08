require('dotenv').config()
const express = require('express')
const app = express()

const https = require('https')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\index.html')
})

app.post('/', function (req, res) {
    const city = req.body.cityName

    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + process.env.API_KEY

    https.get(weatherAPI, function (response) {
        console.log(response)
        response.on('data', function (data) {
            const weatherObject = JSON.parse(data)
            const weatherDesc = weatherObject.weather[0].description
            const temperature = weatherObject.main.temp
            const weatherIcon = weatherObject.weather[0].icon
            const iconURL = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'

            res.write('<p>Currently, the weather is ' + weatherDesc + '</p>')
            res.write('<h1>Temperature in ' + city + ' is ' + temperature + '</h1>')
            res.write('<img src="' + iconURL + '">')
            res.send()
        })
    })

})

app.listen(3000, function () {
    console.log('Server 3000 started')
})