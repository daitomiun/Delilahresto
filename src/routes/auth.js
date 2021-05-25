const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';
const {buscarUser, insertUsers} = require("../repositories/usersRepositories");
const validarDatosLogin = validarDatos.validarDatosLogin;
const validarDatosRegister = validarDatos.validarDatosRegister;
const validarEmail = validarDatos.validarEmail;
const validarClave = validarDatos.validarClave;

router.post('/login', validarDatosLogin, async (req,res)=>{
    const {username, password} = req.body;
    const [usuarios] = await buscarUser(username);

    if (!usuarios){
        res.status(404).json( {status: "Usuario no encontrado"} );
    }else{
        if (usuarios.pasword != password){
            return res.status(400).json( {msg: "Password incorrect"} );
        }else{
            let usuario = {
                id: usuarios.id,
                admin: usuarios.admin,
                name: usuarios.name,
                lastname: usuarios.lastname,
                email: usuarios.email,
                age: usuarios.age,
            }
            let token = jwt.sign({data: usuario}, sign);
            return res.json( {token: token, status: "login"} );
        }
    };
});

router.post('/register', validarDatosRegister, validarEmail, validarClave, (req, res) => {
    let {user_name, password, if_admin, full_name, phone, mail, address} = req.body;
    if (if_admin === "si"){
        if_admin = 1;
    }else{
        if_admin = 0;
    }
    insertUsers(user_name, password, if_admin, full_name, phone, mail, address);
    res.json({msg: "register"});
});

module.exports = router;