const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { query } = require('express')

const app = express();

const port = process.env.PORT || 3000
//Creates path to static folder
const publicDirPath = path.join(__dirname, '../public');
console.log(publicDirPath);

//path to handlebars custom directory
const templateDir = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials');

//set up view engine to use handlebars
app.set('view engine', 'hbs');

//set up custom views directory
app.set('views', templateDir);

//Setup static directory to serve
app.use(express.static(publicDirPath));

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application',
        name: 'Priyanka'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this application',
        name: 'Priyanka'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please send help here!',
        name: 'Priyanka',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            });
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        name: 'Priyanka',
        title: 'Error Page',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        name: 'Priyanka',
        title: 'Error Page',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})