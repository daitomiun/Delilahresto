const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';
const {editarUsers, deleteUsers, buscarInfo, verificarEmail} = require("../repositories/usersRepositories");
const validarEmail = validarDatos.validarEmail;
const validarClave = validarDatos.validarClave;
const validarDatosEditar = validarDatos.validarDatosEditar;

router.get('/',async(req, res) => {
    let token = req.headers['authorization']
    try {
        var decoded = jwt.verify(token, sign);
        let [info] = await buscarInfo(decoded.id)
        res.json({data: info});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

router.put('/',validarDatosEditar, validarClave, validarEmail, async(req, res) => {
    let {user_name, password, full_name, phone, mail, address} = req.body;
    let token = req.headers['authorization']
    var decoded = jwt.verify(token, sign);
    let id = decoded.id;
    try {
      const result = await verificarEmail(mail);
      if (result == ''){
          editarUsers(user_name, password, full_name, phone, mail, address, id);
          res.json({data: "sucessfull"});
      }else{
        if (result[0].id == id){
          editarUsers(user_name, password, full_name, phone, mail, address, id);
          res.json({data: "sucessfull"});
        }else{
          res.status(400).json({msg: "mail en  uso"});
        }
      }
        
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

router.delete('/',(req, res) => {
    let token = req.headers['authorization']
    try {
        var decoded = jwt.verify(token, sign);
        let id = decoded.id;
        deleteUsers(id);
        res.json({status: "delete sucessfull"});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

module.exports = router;