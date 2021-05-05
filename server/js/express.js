const express = require('express');
const helmet = require('helmet')
const jsonWebToken = require('./token')
const cool_images = require('./images')
const app = express();
const port = 3000;
app.use(helmet())


import.

app.get('/', function(req,res){
    res.send('hello ')
    res.send(cool_images.generate())

});

app.listen(port, function(){
    console.log(`el servidor express corre en el puerto http://localhost:${port}`)

});