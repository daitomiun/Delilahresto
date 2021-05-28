const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const {buscarPlato, buscarNombrePlato} = require("../repositories/platosRepositories");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res)=>
{
    const param = req.query.param
    const valor = req.query.valor
    const platos = await buscarPlato(param, valor);
    if (platos == ''){
        res.status(404).json( {status: "no hay platos"} );
    }
    return res.status(200).json( {data: platos , status: "platos encontrados"} );
  
})
router.get('/:name', async (req, res)=>
{

    const name = req.params.name
    console.log(name)
    const platos = await buscarNombrePlato(name);
    // const idplato = 
    if (platos == ''){
        res.status(404).json( {status: "no hay platos"} );
    }
    return res.status(200).json( {data: platos , status: "platos encontrados"} );

})

module.exports = router;
