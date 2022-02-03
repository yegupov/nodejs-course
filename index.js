#!/usr/bin/env node

const readline = require('readline')
const http = require('http')
const myAPIKey = process.env.myAPIKey

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = () => {
  return new Promise((resolve, reject) => {
    rl.question('🌤☂ Узнайте погоду в любом городе мира! ⤵\n🌇 Введите название города (по-английски): ', async (answer) => {
      city = answer.toLowerCase()
      city = city.charAt(0).toUpperCase() + city.substr(1)

      const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`

      console.log('\nCity : ', city, '\n');
      // console.log('Request URL : ', url, '\n\n');

      const request = await http.get(url, (response) => {
        const statusCode = response.statusCode

        if (statusCode !== 200) {
          console.error(`Status Code: ${statusCode}`)
          return
        }

        response.setEncoding('utf8')

        let rawData = ''
        response.on('data', (chunk) => rawData += chunk)
        response.on('end', () => {
          let parsedData = JSON.parse(rawData)
          // console.log('Weather data : ', parsedData)

          if (parsedData.success === false) {
            console.log('Возможно Вы неверно ввели название города. Попробуйте еще раз!\n\n');
          } else {
            console.log(`Погода в городе ${city} : `, parsedData.current.weather_descriptions[0]);
            console.log('Температура : ', parsedData.current.temperature);
            console.log('Влажность : ', parsedData.current.humidity);
            console.log('Feels like : ', parsedData.current.feelslike);
            console.log('Скорость ветра : ', parsedData.current.wind_speed);
            console.log('Давление: : ', parsedData.current.pressure, '\n\n\n');
          }

          resolve()
        })
      })

      request.on('error', (e) => {
        console.error(`Got error: ${e.message}`)
      })
    })
  })
}

const checkWeather = async () => {
  await question()
  checkWeather()
  // rl.close()
}

checkWeather()
