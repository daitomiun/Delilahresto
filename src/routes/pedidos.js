const express = require('express');
const {buscarPedidos, buscarPedidosUsuario, abrirOrden, insertOrder, buscarPedido, editarOrders, editarStatus, deleteOrders, deleteOrdersproducts} = require("../repositories/ordersRepositories");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN || 'ESLAKPEPDDR2021';

router.get('/', async (req, res )=>
{
  let token = req.headers['authorization']
  let decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const orders = await buscarPedidos();
    if (orders == ''){
        res.status(404).json( {status: "no hay pedidos"} );
    }
    return res.status(200).json( {data: orders, status: "pedidos encontrados"} );
  }else{
    if(decoded.if_admin === 0){
      const orders = await buscarPedidosUsuario(decoded.id);
    if (orders == ''){
        res.status(404).json( {status: "no hay pedidos"} );
    }
    return res.status(200).json( {data: orders, status: "pedidos encontrados"} );
    }else{
      res.status(400).json({msg: "error"});
    }
  }
})

router.get('/buscar/:id', async (req, res )=>
{
  let token = req.headers['authorization']
  let decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const id = req.params.id
    const orders = await buscarPedido(id);
    if (orders == ''){
        res.status(404).json( {status: "no hay pedidos"} );
    }
    return res.status(200).json( {data: orders , status: "pedidos encontrados"} );
  }else{
    if(decoded.if_admin === 0){
      res.status(403).json({msg: "Unauthorized"});
    }else{
      res.status(400).json({msg: "error"});
    }
  }
})

router.post('/nuevoPedido', async (req, res)=>
{
    try {
      const {id_products, amount} = req.body
      let token = req.headers['authorization']
      let decoded = jwt.verify(token, sign);
      const [order] = await abrirOrden(decoded.id)
      const products = await insertOrder(id_products, order, amount)
      return res.status(200).json({status: "pedidos hecho"});
      } catch (err) {
        return res.status(400).json({ data: err , status: "error"})
    }

})



router.put('/editarPedido', async (req,res)=>
{
    let {id, id_products, amount} = req.body;
    try {
        editarOrders(id_products, amount, id);
        res.json({data: "sucessfull"});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
}) 

router.put('/editarEstado', async (req,res)=>
{
  let {id_status, id} = req.body;
  let token = req.headers['authorization']
  let decoded = jwt.verify(token, sign);
  if (decoded.if_admin === 1){
    const order = await editarStatus(id_status, id);
    return res.status(200).json( {status: "status actualizado"} );
  }else{
    if(decoded.if_admin === 0){
      res.status(403).json({msg: "Unauthorized"});
    }else{
      res.status(400).json({msg: "error"});
    }
  }
}) 


router.delete('/:id',async (req, res) => {
    let id = req.params.id
    const deleteProduct = await deleteOrdersproducts(id);
    const deleteOrder = await deleteOrders(deleteProduct[0].id_orders)
    return res.status(200).json({status: "delete sucessfull"});
  });

module.exports = router;
