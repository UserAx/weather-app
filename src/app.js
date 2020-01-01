const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const weatherapp = require('./utils/utils');

const publicPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Tutorial'
    });
});

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({error: "Please provide an address"});
    }
    
    weatherapp.geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error});
        }
        weatherapp.forecast(data.latitude,data.longitude, (error, forecastdata) => {
            if(error){return console.log("Error: "+ error);}
            
            res.send({
                forecast: forecastdata,
                address: req.query.address
            });
        });
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help-object',
        name: 'Andrew Tutorial'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'More-object',
        name: 'Created by Andrew Tutorial'
    });
});


app.get('/help/*', (req, res) =>{
    res.send("Help article not found.");
});

app.get('*', (req, res) =>{
    res.send("404 error");
});



app.listen(3000, ()=>{
    console.log("Server is up.");
});