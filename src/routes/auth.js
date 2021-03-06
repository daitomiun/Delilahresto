const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';
const {insertUsers, verificarEmail} = require("../repositories/usersRepositories");
const validarDatosLogin = validarDatos.validarDatosLogin;
const validarDatosRegister = validarDatos.validarDatosRegister;
const validarEmail = validarDatos.validarEmail;
const validarClave = validarDatos.validarClave;

router.post('/login', validarDatosLogin, async (req,res)=>{
    const {mail, password} = req.body;
    const [usuarios] = await verificarEmail(mail);

    if (!usuarios){
        res.status(404).json( {status: "Usuario no encontrado"} );
    }else{
        if (usuarios.password != password){
            return res.status(400).json( {msg: "Password incorrect"} );
        }else{
            let id = usuarios.id
            let if_admin = usuarios.if_admin
            let token = jwt.sign({id: id, if_admin: if_admin}, sign);
            return res.json( {token: token, status: "login"} );
        }
    };
});

router.post('/register', validarDatosRegister, validarEmail, validarClave, async (req, res) => {
    let {user_name, password, if_admin, full_name, phone, mail, address} = req.body;
    if (if_admin === "si"){
        if_admin = 1;
    }else{
        if_admin = 0;
    }
    const result = await verificarEmail(mail);
    if (result == ''){
        insertUsers(user_name, password, if_admin, full_name, phone, mail, address);
        res.json({msg: "register"});
    }
    res.status(400).json({msg: "usuario existente"});
});

module.exports = router;