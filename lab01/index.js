// load in the Express package
// aka includes the Express package
const express = require("express");

// create an express application
// the `express` function will create a new express application
// and we store the application in the `app` variable
const app = express();

// to set up a route
// a route is a pairing of an URL to a function
app.get("/", function(request, response){
    response.send("<h1>Hello World</h1>");
})

app.get('/about-us', function(request, response){
    // the annoymous function will have two parameters
    // the first one is the request (i.e whatever the client sends to the server)
    // the second one is the response -- what the server will send back to the client
    response.send("<h1>About Us</h1>");
})

// one way for the server to recieve data from the browser
// is via route parameters
// a route parameter is like a placeholder in the URL
app.get("/hello/:name", function(req,res){
    const name = req.params.name;
    res.send("Hello there " + name)
})

app.get('/square/:number', function(req,res){
    const number = req.params.number;
    const squared = parseInt(number) ** 2;
    res.send("Squared is " + squared);
})

// start the server at port 3000
// the second parameter is a function that is called
// when the server starts
app.listen(3000, function(){
    console.log("Hello world");
})
