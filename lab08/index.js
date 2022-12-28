const express = require('express');
// The MongoClient is like the command line Mongo client or the one in compass
// except this time round it's embedded in our Express
const MongoClient = require("mongodb").MongoClient;

// read in the key/value pairs in the .env file
// and made them available via `process.env`
require('dotenv').config();

const app = express();

// function to connect to MongoDB
// first parameter -- the connection string (aka Mongo URI)
// second parameter -- the name of the database
// returns a Mongo database refrence
async function connect(uri, dbname) {
    let client = await MongoClient.connect(uri,{
        useUnifiedTopology: true // use the latest method to connect to MongoDB
    })
    const db = client.db(dbname);
    return db;
}

async function main() {
    const db = await connect(process.env.MONGO_URI, "sample_airbnb")
    // from line 19 onwards, the Mongo `client` will be ready to use

    // FOR DEMONSTRATION WITH THE SAMPLE_AIRBNB database
    // app.get('/', async function(req,res){
    //     // eqv: db.collection('listings_and_reviews').find().limit(10);
    //     const listings = await db.collection('listingsAndReviews').find().limit(10).toArray();
    //     // if we use res.send and the first parameter is a JavaScript object or array, Express will automatically send back JSON
    //     res.status(200); // indicate later when we send, we want the status code to be 200
    //     res.send(listings);  // a normal res.send or res.render by default is status code 200
    // })

}

// call the main before the `app.listen`
main();

// Make sure to do `app.listen` LAST
app.listen(3000, function(){
    console.log("Server has started");
})