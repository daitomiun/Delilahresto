const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';
const {buscarUser, insertUsers, verificarEmail} = require("../repositories/usersRepositories");
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
        if (usuarios.password != password){
            return res.status(400).json( {msg: "Password incorrect"} );
        }else{
            let usuario = {
                id: usuarios.id,
                user_name: usuarios.user_name,
                if_admin: usuarios.if_admin,
                full_name: usuarios.full_name,
                phone: usuarios.phone,
                mail: usuarios.mail,
                address: usuarios.address
            }
            let token = jwt.sign({data: usuario}, sign);
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