const jwt = require('jsonwebtoken');
const informacion = {nombre: 'Mateo'}
const firma = 'el pass';
const token = jwt.sign(informacion, firma);
console.log(token);
const descodificado = jwt.verify(token, firma)
console.log(descodificado);