const sequelize = require('../database/conexion');

exports.platosTotal = async () => {
    const allProducts = await sequelize.query(`SELECT * FROM products`, 
    {type: sequelize.QueryTypes.SELECT})
    return allProducts
}

exports.insertPlate = async (name, price, img_url, description) => {
    const allProducts = await sequelize.query(`INSERT INTO products (name, price, img_url, description) VALUE (?, ?, ?, ?)`, 
    {replacements: [name, price, img_url, description], type: sequelize.QueryTypes.INSERT})
    return 
}
exports.buscarPlato= async (param, valor) => {
    try{
        // const platos =  await sequelize.query(`SELECT * FROM products WHERE ${param.replace(/[' "]+/g, '')} LIKE :search_name`, { replacements: { search_name: `${valor}%`}, type: sequelize.QueryTypes.SELECT});
        const platos =  await sequelize.query(`SELECT * FROM products WHERE ${param} LIKE :search_name`, { replacements: { search_name: `${valor}%`}, type: sequelize.QueryTypes.SELECT});
        return platos
        
        
    }catch (error){
        console.log(error);
    }
}

exports.editarPlato = async (name, price, img_url, description, id) => {
    const plato = await sequelize.query('UPDATE products SET name = ?, price = ?, img_url = ?, description = ? WHERE id = ?', 
    {replacements: [name, price, img_url, description, id]})
    return
}

exports.deletePlates = async (id) => {
    try{
        // return await sequelize.query('DELETE FROM products WHERE id = ?', {replacements: {id}});
        return await sequelize.query(`DELETE FROM products WHERE id = ${id}`);

        // return await sequelize.query(`DELETE FROM products WHERE id = ${parseInt(id)}`, {replacements: {id},  type: sequelize.QueryTypes.DELETE});
 
    }catch (error){
        console.log(error);
    }
}
 
