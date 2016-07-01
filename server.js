const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

app.use(bodyParser.json());
///////////////////////////


///////////////////////////
app.listen(port, ()=>{
	console.log(`Express listening on ${port}`);
})
