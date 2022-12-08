const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

// setup handlebars
// 1. wax-on
// 2. [NEW] setup the 189 handlebars helpers
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts")

// setup the 189 handlebar helpers
const configureHelpers = require('handlebars-helpers');
configureHelpers({
    "handlebars": hbs.handlebars
});

// Create an in-memory database
// * the foodRecord array is not defined in any functions, it is in GLOBAL SCOPE
// * all the other route functions are able to access the array 
// * i.e the foodRecords array is shared with all the other route functions
let foodRecords = [
    {
        // all data points in a database must have an unique identifier
        "id": Math.floor(Math.random() * 100000 + 1),
        "foodName":"Duck Rice",
        "calories": 500,
        "meal":"lunch",
        "tags":["organic", "homecooked"]
    },
    {
        "id": Math.floor(Math.random() * 100000 + 1),
        "foodName":"Brown Rice Milkshake",
        "calories": 300,
        "meal":"dinner",
        "tags":["vegan", "organic"]
    },
    {
        "id": Math.floor(Math.random() * 100000 + 1),
        "foodName":"KFC Fried Chicken",
        "calories": 800,
        "meal": "breakfast",
        "tags":["unhealthy"]
    }
];

// all your routes before app.listen

// Display all the food records
app.get('/', function(req,res){
    // 1. get all the food records from the database
    const allFoodRecords = foodRecords;

    // 2. send all the food records to the hbs file to be displayed
    // - res.render has two parameters
    res.render("all-food.hbs", {
        "foodRecords": allFoodRecords
    })
})



// make sure app.listen is the last code to execute
app.listen(3000, function(){
    console.log("server has started")
})