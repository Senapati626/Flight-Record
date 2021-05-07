const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://nls-admin:database123@senapcluster.z540e.mongodb.net/flights",{useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//console.log(db);

const flightsSchema = {
    first_name: String,
    last_name: String,
    trip_type: String,
    origin: String,
    destination: String
}

const Flight = mongoose.model('posts', flightsSchema);
app.get("/", (req,res)=>{
    //res.sendFile(__dirname + '/form.html');
    res.send('its working')
})
app.get("/done", (req,res)=>{
    Flight.find({},(err,flights)=>{
        res.render('index',{
            userFlight: flights
        })
    })
})
app.post("/", (req,res)=>{
    let newData = new Flight({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        trip_type: req.body.trip_type,
        origin: req.body.origin,
        destination: req.body.destination
    });
    newData.save();
    res.redirect('/done');

})

app.listen(process.env.PORT || 3001, () => {
    console.log('app is running.')
} )