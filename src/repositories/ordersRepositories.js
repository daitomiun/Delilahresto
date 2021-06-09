const sequelize = require('../database/conexion');


exports.insertOrder = async (id_client, id_status) => {
    const allorders = await sequelize.query(`INSERT INTO orders ( id_client, id_status) VALUE (  '${id_client}', '${id_status}')`, 
    {replacements: [id_client, id_status], type: sequelize.QueryTypes.INSERT})
    return allorders
}
exports.buscarPedido= async (id_num) => {
    try{
        // const platos =  await sequelize.query(`SELECT * FROM products WHERE ${param.replace(/[' "]+/g, '')} LIKE :search_name`, { replacements: { search_name: `${valor}%`}, type: sequelize.QueryTypes.SELECT});
        // const orders =  await sequelize.query(`SELECT * FROM orders WHERE ${id_client} LIKE :search_name`, { replacements: { search_name: `${id_num}%`}, type: sequelize.QueryTypes.SELECT});
        const orders =  await sequelize.query(`SELECT * FROM orders WHERE id LIKE :search_name`, { replacements: { search_name: `${id_num}%`}, type: sequelize.QueryTypes.SELECT});
        return orders

        
        
    }catch (error){
        console.log(error);
    }
}

exports.editarOrders = async (new_id_client, new_id_status, new_id) => {
    const orders = await sequelize.query('UPDATE orders SET id_client = ?, id_status = ? WHERE id = ?', 
    {replacements: [new_id_client, new_id_status, new_id]})
    return orders
}

exports.deleteOrders = async (id) => {
    try{
        // return await sequelize.query('DELETE FROM products WHERE id = ?', {replacements: {id}});
        return await sequelize.query(`DELETE FROM orders WHERE id = ${id}`);

        // return await sequelize.query(`DELETE FROM products WHERE id = ${parseInt(id)}`, {replacements: {id},  type: sequelize.QueryTypes.DELETE});
 
    }catch (error){
        console.log(error);
    }
}
