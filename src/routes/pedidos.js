const express = require('express');

const {insertOrder, buscarPedido, editarOrders, deleteOrders} = require("../repositories/ordersRepositories");
const router = express.Router();
require('dotenv').config();


router.post('/nuevoPedido', async (req, res)=>
{
    // const id_client = req.query.id_client
    // const id_status = req.query.id_status
    // const orders = await insertOrder(id_client, id_status)

    try {
        let {id_client, id_status} = req.body
        const orders = await insertOrder(id_client,id_status);
        console.log(orders)
        return res.status(200).json( {data: orders , status: "pedidos hecho"} );
        // const user = await User.create({ name: request.body.email });
        // // you can now access the newly created user
        // console.log('success', user.toJSON());
      } catch (err) {
        // print the error details
        return res.status(400).json({ data: err , status: "pedidos no puestos"})
        // console.log(err, "algo paso  mal");
    }

})

router.get('/', async (req, res )=>
{
    const id = req.query.id
    // const id_num = req.query.num
    const orders = await buscarPedido(id);
    console.log(orders)
    if (orders == ''){
        res.status(404).json( {status: "no hay pedidos"} );
    }
    return res.status(200).json( {data: orders , status: "pedidos encontrados"} );
})

router.put('/', async (req,res)=>
{
    let {id_client, id_status, id} = req.body;
    
    try {
        editarOrders(id_client, id_status, id);
        res.json({data: "sucessfull"});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
}) 


router.delete('/',async (req, res) => {

    // let id = req.params.id;
    
    let {id} = req.body
    
    console.log(id)
    const deleteOrder = await deleteOrders(id);
  
    if (!id || id == "") {
  
      res.status(400).json({msg: "error"});
      console.error("Error:")
    } 
    return res.status(200).json({data: deleteOrder, status: "delete sucessfull"});
       
        // const id = gustoshelados.find((el) => el.id == req.params.id)
  
    
  });

module.exports = router;
