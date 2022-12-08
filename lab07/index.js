const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

// enable the use of forms in express
// if not done, then req.body is always undefined
app.use(express.urlencoded({
    extended: false
}))

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

// add a food record (display the form)
app.get("/add-food", function(req,res){
    res.render('add-food')
})

// process the form for add food record
app.post('/add-food', function(req,res){
    console.log(req.body);
    const foodName = req.body.foodName;
    const calories = req.body.calories;
    const meal = req.body.meal;

    // assume no checkboxes were checked
    let selectedTags = [];

    // 1. check if req.body.tags is an array (> 1 selected)
    if (Array.isArray(req.body.tags)) {
        selectedTags = req.body.tags;
    } else if (req.body.tags){
        // 2. if req.body.tags is not an array, then checked whether it is truthly
        // (i.e make sure req.body.tags is not undefined). If so, then it must be a single
        // string (i.e the user only select one checkbox)
        selectedTags.push(req.body.tags);
    }   
    // by the end of if...else, selectedTags will be  an array regardless
    // if the user selected zero, one or more than one checkboxes

    // create the food record
    const newFoodRecord = {
        'id': Math.floor(Math.random() * 100000 + 1),
        'foodName': foodName,
        'calories': calories,
        'meal': meal,
        'tags': selectedTags
    }

    // add the new food record to the database
    foodRecords.push(newFoodRecord);

    // redirect the client (aka) browser) to a different URL
    res.redirect('/')
})


// make sure app.listen is the last code to execute
app.listen(3000, function(){
    console.log("server has started")
})