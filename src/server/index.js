const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(cors());

let getCoordinates = require('./geo');
let getWeather = require('./dark');
let getImage = require('./pixa');

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

const port = 8082
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
postObject = {};
app.post('/dataPost', function (req, res) {
    inputCity = req.body.city;
    getCoordinates(inputCity)
        .then(data => getWeather(data[0], data[1]))
        .then(function (data) {
            weathersummary = data[0];
            temperature = data[1]
        })
        .then(data => getImage(inputCity))
        .then(function (data) {
            imageurl = data;
            postObject.imageurl = imageurl;
            postObject.summary = weathersummary;
            postObject.temperature = temperature;
            postObject.future = req.body.future;
            postObject.duration = req.body.duration;
            postObject.city = req.body.city;
            res.send({
                msg: "Received and processed"
            })
        })
})

app.get('/all', function (req, res) {
    res.send(postObject);
});