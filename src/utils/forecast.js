const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d1a6f798630d1da413af9eb305644039&query=${latitude},${longitude}`
    request({url: url, json: true}, (error, { body } = {} ) => {
      if(error) {
          callback('No connection', undefined)
      } else if (body.error) {
          callback('Cant find the location', undefined)
      } else {
          callback(undefined, {
              description: body.current.weather_descriptions[0],
              temp: body.current.temperature,
              feelslike: body.current.feelslike,
          })
      }
    })
}

module.exports = forecast