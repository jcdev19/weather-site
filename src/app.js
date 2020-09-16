const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')


const app = express()
const port = process.env.PORT || 3000
//Define paths for exprewss config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'jesse'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'jesse'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'jesse',
        message: 'This is the help message from app.get'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must add an address'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {} ) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }
            // console.log('Data', forecastData)
            console.log(location)
            console.log(`temp:${forecastData.temp}`)
            console.log(`feels:${forecastData.feelslike}`)
            res.send({
                forecast: `temp is ${forecastData.temp} and it feels like ${forecastData.feelslike}, windspeed is ${forecastData.windSpeed}`,
                location: location,
                address: req.query.address
            })
            
        })
    })
    
})

app.get('/forecast', (req,res) => {
    req.query
    res.send({
        obj: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Oops',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Oops',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})