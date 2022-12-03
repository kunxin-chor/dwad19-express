// include Express to this file so that we can use it
// the variable can be ANY name
// but the parameter must be 'express'
const express = require('express');

// include in HBS (HBS is short for "handlebars")
const hbs = require('hbs');

// 2. create an express application
const app = express();  // when we call the express() it will create a new Express app

// 2b. setup Express to use HBS
// a 'view engine' refers to a method of sending the content of a file back from Express
// usually the file will contain HTML
app.set('view engine', 'hbs')

// b. setup the static file folder to be in '/public'
// static files here refer to css, js and image files and etc.
app.use(express.static('public'));

// 3. define routes
app.get("/", function(req, res){
    // res.render() allows Express to send the content of a file back as the response
    res.render("index");
})

app.get('/hello/:name', function(req,res){
    const name = req.params.name;
    // the first parameter is the  hbs file to be displayed
    // the second parameter is an object
    // each KEY in the object is linked to one VARIABLE in the HBS file
    res.render('hello', {
        "personName": name
    })
})

app.get('/hello/:first_name/:last_name', function(req,res){
    const firstName = req.params.first_name;
    const lastName = req.params.last_name;
    res.render('hello_again', {
        // placeholder : value for the placeholder
        'firstName': firstName,
        'lastName': lastName
    })
})

app.get('/now', function(req,res){
    const date = new Date(); // will get the current date and time
    res.render('now',{
        'datetime': date
    })
})

// 4. start server
// if we didn't start server, the Express application won't be able
// to recieve any requests
app.listen(3000, function(){
    console.log("Server started");
})