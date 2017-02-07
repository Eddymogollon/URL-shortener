'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const mongoose = require('mongoose');
const Url = require('./models/url');
const path = require('path');
const port = process.env.PORT || 8080;
const myMongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/website";
const app = express();

// mongodb connection
mongoose.connect(myMongoDB);
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

//set up pug
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Include routes
app.use('/', router);


app.listen(port, function() {
	console.log(`The frontend server is running on port ${port}!`);
});