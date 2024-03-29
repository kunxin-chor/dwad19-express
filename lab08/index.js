const express = require('express');
const { ObjectId } = require('mongodb');
// The MongoClient is like the command line Mongo client or the one in compass
// except this time round it's embedded in our Express
const MongoClient = require("mongodb").MongoClient;

// read in the key/value pairs in the .env file
// and made them available via `process.env`
require('dotenv').config();



const app = express();

app.use(express.json()); // needed to enable json

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
    const db = await connect(process.env.MONGO_URI, "dwad19_free_food_sightings")
    // from line 19 onwards, the Mongo `client` will be ready to use

    // FOR DEMONSTRATION WITH THE SAMPLE_AIRBNB database
    // app.get('/', async function(req,res){
    //     // eqv: db.collection('listings_and_reviews').find().limit(10);
    //     const listings = await db.collection('listingsAndReviews').find().limit(10).toArray();
    //     // if we use res.send and the first parameter is a JavaScript object or array, Express will automatically send back JSON
    //     res.status(200); // indicate later when we send, we want the status code to be 200
    //     res.send(listings);  // a normal res.send or res.render by default is status code 200
    // })

     // POST route cannot be tested via the browser
     app.post('/food_sightings', async function(req,res){
        // TODO: validation (as an execrise for the student)
        let description = req.body.description;
        let food = req.body.food;
        // when new Date() is called without an argument, then automatically
        // it will be the server's date and time
        let datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();
        let result = await db.collection('sightings').insertOne({
            'description': description,
            'food': food,
            'datetime': datetime
        })
        res.status(201); // set the status code to be 201
        res.send(result);
    })

    app.get('/food_sightings/:id', async function(req,res){
        res.json(await db.collection('sightings').findOne({
            '_id': ObjectId(req.params.id)
        }))
    })

    app.get('/food_sightings', async function(req,res){
        // base query: the query that will get ALL the documents
        let criteria = {};

        if (req.query.description) {
            // {
            // "description": ....    
            //}
            // add the `description` key to the criteria object
            criteria['description'] = {
                '$regex': req.query.description, '$options':'i'
            }
        }

        if (req.query.food) {
            criteria['food'] = {
                '$in': [req.query.food]
            }
        }

        let results = await db.collection('sightings').find(criteria);
        res.status(200);
        // ! toArray() is async
        res.send(await results.toArray());
    } )

    // update
    // patch vs. put (most of the time we will use put)
    app.put('/food_sightings/:id', async function(req,res){
        let description = req.body.description;
        let food = req.body.food;
        let datetime = req.body.date ? new Date(req.body.date) : new Date();
        let results = await db.collection('sightings').updateOne({
            '_id': ObjectId(req.params.id)
        },{
            '$set':{
                'description': description,
                'food': food,
                'datetime': datetime
            }
        });
        res.status(200);
        res.json(results);
    });

    // since we are adding a new comment -- CREATING something new
    app.post("/food_sightings/:id/comments", async function(req,res){
        // to update the document we'll use updateOne
        // why not insertOne?
        // we want to MODIFY an existing food_sighting by ADDING
        // a new comment to it
        await db.collection('sightings').updateOne({
            "_id":ObjectId(req.params.id)
        }, {
            // use $push to add to comments
            "$push":{
                "comments": {
                    "_id": ObjectId(), // if we use the ObjectId function without any parameters
                                       // the ObjectId function returns a new unique _id
                    "content": req.body.content
                }
            }
        });

        res.json({
            'message': "success"
        })
    })


    app.put('/food/:id/comments/:noteid/', async function(req,res){
        let newContent = req.body.content;
        await db.collection('food_sightings').updateOne({
            '_id':ObjectId(req.params.id),
            'notes._id':ObjectId(req.params.comment_id)
        },{
            '$set':{
                'notes.$.content': newContent
            }
        })
        res.redirect(`/food/${req.params.foodid}/notes`);
    });


    app.delete('/food_sightings/:id/comments/:comment_id', async function(req,res){
        await db.collection('food_sightings').updateOne({
            _id:ObjectId(req.params.id)  // find the food sighting that we want to delete the comment from
        }, {
            // use $pull to remove from array
            '$pull':{
                'comments':{
                    _id: ObjectId(req.params.comment_id)
                }
            }
        })

        res.json({
            'message':'Success'
        })
    })

    
}

// call the main before the `app.listen`
main();

// Make sure to do `app.listen` LAST
app.listen(3000, function(){
    console.log("Server has started");
})