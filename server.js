const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const masterRoutes = require('./server/masterRoutes.js');


const app = express();
const port = 8080;

const mongoUri = 'mongodb://localhost:27017/deed';
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
///////////////////////////


masterRoutes(app);















///////////////////////////
app.listen(port, ()=>{
	console.log(`Express listening on ${port}`);
});
mongoose.connection.once('open', ()=>{
	console.log(`Connected to mongoDB at: ${mongoUri}`);
});

