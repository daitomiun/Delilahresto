const express = require('express');
const validarDatos = require('./../middlewares/validarPlatos');
const {platosTotal, buscarPlato,  insertPlate, deletePlates, editarPlato} = require("../repositories/platosRepositories");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';

router.get('/', async (req, res)=>
{
    const platos = await platosTotal();
    console.log(platos)
    if (platos == ''){
        res.status(404).json( {status: "no hay platos"} );
    }
    return res.status(200).json( {data: platos , status: "platos encontrados"} );
  
})

router.get('/buscar', async (req, res)=>
{
    const param = req.query.param
    const valor = req.query.valor
    const platos = await buscarPlato(param, valor);
    if (platos == ''){
        res.status(404).json( {status: "no hay platos"} );
    }
    return res.status(200).json( {data: platos , status: "platos encontrados"} );
  
})
router.post('/nuevoPlato', validarDatos.validarDatosplatos,  async (req, res)=>{
  let {name, price, img_url, description} = req.body
  let token = req.headers['authorization']
  var decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const platos = await insertPlate(name, price, img_url, description);
    res.json({status: "Sucessfull"});
  }else{
    if(decoded.if_admin === 0){
      res.status(403).json({msg: "Unauthorized"});
    }else{
      res.status(400).json({msg: "error"});
    }
  }
})
router.put('/:id',validarDatos.validarDatosplatos, async(req, res) => {
  let {name, price, img_url, description} = req.body
  let id = req.params.id
  let token = req.headers['authorization']
  var decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const platos = await editarPlato(name, price, img_url, description, id);
    res.json({status: "Sucessfull"});
  }else{
    if(decoded.if_admin === 0){
      res.status(403).json({msg: "Unauthorized"});
    }else{
      res.status(400).json({msg: "error"});
    }
  }
});

router.delete('/:id',async (req, res) => {
  let id = req.params.id
  let token = req.headers['authorization']
  var decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const deletePlate = await deletePlates(id);
    res.json({status: "delete sucessfull"});
  }else{
    if(decoded.if_admin === 0){
      res.status(403).json({msg: "Unauthorized"});
    }else{
      res.status(400).json({msg: "error"});
    }
  }
});
module.exports = router;
