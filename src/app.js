const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jyoti'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'jyoti',
        title: 'About Me'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Thank you for coming , here we are helping you.',
        name: 'jyoti'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    else {
        geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            })
        })
    }

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'jyoti',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jyoti',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})