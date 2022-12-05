const express = require('express');

// setup wax-on
const waxOn = require('wax-on');
const hbs = require('hbs');
waxOn.on(hbs.handlebars);

// tell waxOn where to find the layout files
waxOn.setLayoutPath('./views/layouts');

// 1. SETUP EXPRESS
const app = express();
app.set('view engine', 'hbs');

// 2. ROUTES
app.get('/', function(req,res){
    res.render('index');
})

app.get('/about-us', function(req,res){
    res.render('about-us');
})

app.get('/contact-us', function(req,res){
    res.render("contact-us");
})

// 3. LISTEN
app.listen(3000, function(){
    console.log('server has started')
})