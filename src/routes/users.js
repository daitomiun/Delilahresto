const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';
const {editarUsers, deleteUsers} = require("../repositories/usersRepositories");
const validarEmail = validarDatos.validarEmail;
const validarClave = validarDatos.validarClave;

router.get('/',(req, res) => {
    let token = req.headers['authorization']
    try {
        var decoded = jwt.verify(token, sign);
        res.json({data: decoded.data});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

router.put('/', validarClave, validarEmail, (req, res) => {
    let {user_name, password, full_name, phone, mail, address} = req.body;
    let token = req.headers['authorization']
    var decoded = jwt.verify(token, sign);
    let id = decoded.data.id;
    try {
        editarUsers(user_name, password, full_name, phone, mail, address, id);
        let usuario = {
            id,
            user_name,
            if_admin: decoded.data.if_admin,
            full_name,
            phone,
            mail,
            address
        }
        token = jwt.sign({data: usuario}, sign);
        res.json({data: "sucessfull", newtoken: token});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

router.delete('/',(req, res) => {
    let token = req.headers['authorization']
    try {
        var decoded = jwt.verify(token, sign);
        let id = decoded.data.id;
        deleteUsers(id);
        res.json({status: "delete sucessfull"});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

module.exports = router;