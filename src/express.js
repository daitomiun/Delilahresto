const express = require('express');

const jsonWebToken = require('./token')

const app = express();
const port = 3006;



// import.

app.get('/', function(req,res){
    res.send('hello ')

});

app.listen(port, function(){
    console.log(`el servidor express corre en el puerto http://localhost:${port}`)

});