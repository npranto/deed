const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');


const masterRoutes = require('./server/masterRoutes.js');


const app = express();
const port = 8080;

const mongoUri = 'mongodb://localhost:27017/deed';
mongoose.connect(mongoUri);

app.use(session({
	secret: 'jdjfgfdg-dfgdfg-dfgfdgjZ773Y7Z-nasdfjfhajsb4-zaXN',
	resave: true,
	saveUninitialized: true
}));
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

