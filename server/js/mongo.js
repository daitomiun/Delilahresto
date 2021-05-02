const mongo = require('mongoose');
mongo.connect('mongo://localhost:27017/mi_base')

// mongo.Schema = {nombre: String, apellido:String, edad: Number}

const yo = {nombre: "mateo", appellido: "fierro", edad:16}

let nevo_usuario = new Usuarios(yo)
nevo_usuario.save()

Usuarios.find().then(function(resultados){
    console.log(resultados);
})

Usuarios.find({nombre:"mateo"}).then(function(resultados)
{
    console.log(resultados)
})