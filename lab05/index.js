// 1. SETUP EXPRESS
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// 1a. create the app
const app = express();

// 1b setup our view engine (aka template engine)
// tell Express that we are using hbs
app.set('view engine', 'hbs');

// 1c setup wax-on
wax.on(hbs.handlebars);

// 1d tell wax-on where to find the layout files
wax.setLayoutPath("./views/layouts");

// 1e use static files (i.e, images, css, js etc. -- that is, all content not generated
// by our routes)
app.use(express.static('public'));

// Register our custom helpers before the routes
// the first parameter is the name of the helper
// the second parameter is an annyomous function that is called
// whenever the custom helper is used
hbs.handlebars.registerHelper("ifEquals", function(arg1, arg2, options){
    if (arg1==arg2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

// 2. CREATE ROUTES
app.get('/', function (req, res) {

    
    const fruits = ["Apples", 
        "Bananas", 
        "Dragonfruit", 
        "Kiwi", 
        "Durian"
    ];

    const favoriteFruit = "Oranges"

    // res.render() will process the content
    // from the hbs file (in the first parameter)
    // and send it back as HTML to the browser
    res.render("index", {
        "ourFruits": fruits,
        "favorite": favoriteFruit
    })
})

// 3. START SERVER (No routers after you've started server)
app.listen(3000, function () {
    console.log("Server has started");
})