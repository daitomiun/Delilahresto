const sequelize = require('../database/conexion');


exports.abrirOrden = async (id_client) => {
    const allorders = await sequelize.query(`INSERT INTO orders ( id_client) VALUE (?)`, 
    {replacements: [id_client], type: sequelize.QueryTypes.INSERT})
    return allorders
}

exports.insertOrder = async (id_products, id_orders, amount) => {
    const allorders = await sequelize.query(`INSERT INTO orders_products (id_products, id_orders, amount) VALUES (?, ?, ?)`, 
    {replacements: [id_products, id_orders, amount], type: sequelize.QueryTypes.INSERT})
    return allorders
}

exports.buscarPedidos = async (id) => {
    try{
        const orders =  await sequelize.query(`SELECT orders.id, users.full_name AS user, products.name AS products, orders_products.amount, users.phone, users.mail, users.address, status.status FROM orders INNER JOIN users ON orders.id_client = users.id INNER JOIN status ON orders.id_status = status.id INNER JOIN orders_products ON orders_products.id_orders = orders.id INNER JOIN products ON products.id = orders_products.id_products`, {type: sequelize.QueryTypes.SELECT});
        return orders
    }catch (error){
        console.log(error);
    }
}

exports.buscarPedido= async (id) => {
    try{
        const orders =  await sequelize.query(`SELECT orders.id, users.full_name AS user, products.name AS products, orders_products.amount, users.phone, users.mail, users.address, status.status FROM orders INNER JOIN users ON orders.id_client = users.id INNER JOIN status ON orders.id_status = status.id INNER JOIN orders_products ON orders_products.id_orders = orders.id INNER JOIN products ON products.id = orders_products.id_products WHERE orders.id = ?`, {replacements: [id], type: sequelize.QueryTypes.SELECT});
        return orders  
    }catch (error){
        console.log(error);
    }
}

exports.buscarPedidosUsuario= async (id) => {
    try{
        const orders =  await sequelize.query(`SELECT orders.id, users.full_name AS user, products.name AS products, orders_products.amount, users.phone, users.mail, users.address, status.status FROM orders INNER JOIN users ON orders.id_client = users.id INNER JOIN status ON orders.id_status = status.id INNER JOIN orders_products ON orders_products.id_orders = orders.id INNER JOIN products ON products.id = orders_products.id_products WHERE orders.id_client = ?`, {replacements: [id], type: sequelize.QueryTypes.SELECT});
        return orders  
    }catch (error){
        console.log(error);
    }
}

exports.editarOrders = async (id_products, amount, id) => {
    const orders = await sequelize.query('UPDATE orders_products SET id_products = ?, amount = ? WHERE id = ?', 
    {replacements: [id_products, amount, id]})
    return orders
}

exports.editarStatus = async (id_status, id) => {
    const orders = await sequelize.query('UPDATE orders SET id_status = ? WHERE id = ?', 
    {replacements: [id_status, id]})
    return orders
}

exports.deleteOrdersproducts = async (id) => {
    try{
        const buscar = await sequelize.query(`SELECT * FROM orders_products WHERE id = ${id}`, {type: sequelize.QueryTypes.SELECT});
        const eliminar = await sequelize.query(`DELETE FROM orders_products WHERE id = ${id}`);
        return buscar
    }catch (error){
        console.log(error);
    }
}

exports.deleteOrders = async (id) => {
    try{
         return await sequelize.query(`DELETE FROM orders WHERE id = ${id}`);
    }catch (error){
        console.log(error);
    }
}
