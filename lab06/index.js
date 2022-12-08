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

// enable forms
// populate in req.body whatever data
// the user has sent in the form
app.use(express.urlencoded({
    extended: false // disable advanced features
}));

// 2. CREATE ROUTES
app.get('/survey', function(req,res){
    res.render('form')
})

app.post('/survey', function(req,res){
    console.log("req.body=", req.body);
    // extracting out what the user has typed into the form
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    const feedback = req.body.feedback;

    // assume that none of the checkboxes have been checked
    let selectedCheckboxes = [];
    // Array.isArray() returns true it is first parameter is an array
    if (Array.isArray(req.body.knowAbout)) {
        // if req.body.knowAbout is an array, we replace selectedCheckboxes with it
        selectedCheckboxes = req.body.knowAbout
    } else if (req.body.knowAbout) {
        // if req.body.knowAbout is a string, then we add it to the selectedCheckboxes array
        selectedCheckboxes.push(req.body.knowAbout);
    }

    console.log("selected Checkboxes =", selectedCheckboxes)

    if (email && mobileNumber && feedback) {
        res.send("Didn't fill in the whole form")
    } else {
        res.send(`
        Email = ${email}
        Mobile Number = ${mobileNumber}
        Feedback = ${feedback}
        Selected checkboxes = ${selectedCheckboxes}
    `);
    }

  
})

// 3. START SERVER (No routers after you've started server)
app.listen(3000, function(){
    console.log("Server has started");
})