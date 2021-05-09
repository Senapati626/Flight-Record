const express = require('express');
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose');
const { render } = require('ejs');
const app = express();



//setting up dbms
connectionString = "mongodb+srv://nls-admin:database123@senapcluster.z540e.mongodb.net/flights";
mongoClient.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('established connection with database')
        const db = client.db('flights')
        const collectionName = db.collection('posts')

        //middlewares
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        app.set('view engine', 'ejs')
        app.use(express.static('public'))

        //Routes
        app.get("/", (req,res)=>{
            collectionName.find().toArray()
                .then(flights => {
                    res.render('index.ejs', {userFlight: flights})
                })
                .catch(err => console.log(err))
        })

        app.get("/add", (req,res)=>{
            res.render('form.ejs')
        })

        app.post("/add", (req,res)=>{
            collectionName.insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(err => console.log(err))
        })
        app.delete('/delete', (req,res)=>{
            collectionName.remove(
                {_id: new ObjectId(req.body.key)}
            )
            .then(result => {
                res.redirect('/')
            })
            .catch(err => console.log(err))
        })
        app.listen(process.env.PORT || 3001, () => {
            console.log(`app is running on ${process.env.PORT}`)
        } )

    })
    .catch(console.error)



//console.log(db);









