const express = require('express');
const validarDatos = require('./../middlewares/validarPlatos');
const {buscarPlato,  insertPlate, deletePlates} = require("../repositories/platosRepositories");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res)=>
{
    const param = req.query.param
    const valor = req.query.valor
    const platos = await buscarPlato(param, valor);
    console.log(platos)
    if (platos == ''){
        res.status(404).json( {status: "no hay platos"} );
    }
    return res.status(200).json( {data: platos , status: "platos encontrados"} );
  
})
router.post('/nuevoPlato', validarDatos.validarDatosplatos,  async (req, res)=>
{

    // const name = req.params.name
    // const price = req.params.price
    // const img = req.params.img_url
    // const description = req.params.description
    try {
        let {name, price, img_url, description} = req.body
        const platos = await insertPlate(name, price, img_url, description);
        console.log(platos)
        return res.status(200).json( {data: platos , status: "platos encontrados"} );
        // const user = await User.create({ name: request.body.email });
        // // you can now access the newly created user
        // console.log('success', user.toJSON());
      } catch (err) {
        // print the error details
        return res.status(400).json({ data: err , status: "platos no puestos"})
        // console.log(err, "algo paso  mal");
      }

    // console.log(name)
    // const idplato = 
    // if (platos == ''){
    //     res.status(404).json( {status: "no hay platos"} );
    // }
    
})

router.delete('/',async (req, res) => {

  // let id = req.params.id;
  
  let {id} = req.body
  
  console.log(id)
  const deletePlate = await deletePlates(id);

  if (!id || id == "") {

    res.status(400).json({msg: "error"});
    console.error("Error:")
  } 
  return res.status(200).json({data: deletePlate, status: "delete sucessfull"});
     
      // const id = gustoshelados.find((el) => el.id == req.params.id)

  
});



module.exports = router;
