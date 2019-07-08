const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Andrey'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About me', name: 'Andrey'});
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', name: 'Andrey',
        helpText: 'This is some Helpful text'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'sunny',
        location: 'Sofia'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrey',
        errorMessage: 'Help page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrey',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});