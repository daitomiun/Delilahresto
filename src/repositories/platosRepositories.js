const sequelize = require('../database/conexion');

exports.insertPlate = async (name, price, img_url, id, description) => {
    const allProducts = await sequelize.query(`INSERT INTO products (name, price, img_url, id, description) VALUE ( ${name}, ${price}, ${img_url}, ${id}, ${description})`, 
    {replacements: [name, price, img_url, id, description], type: sequelize.QueryTypes.INSERT})
    return
}
exports.buscarPlato= async (param, valor) => {
    try{
        const platos =  await sequelize.query(`SELECT * FROM products WHERE ${param.replace(/[' "]+/g, '')} LIKE :search_name`, { replacements: { search_name: `${valor}%`}, type: sequelize.QueryTypes.SELECT});
        return platos
        
        
    }catch (error){
        console.log(error);
    }
}
exports.buscarNombrePlato= async (name) => {
    try{
        return await sequelize.query('SELECT * FROM products WHERE name = ?', {replacements: [name], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}
exports.buscarPrecioPlato= async (price) => {
    try{
        return await sequelize.query('SELECT * FROM products WHERE price = ?', {replacements: [price], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}
exports.buscarimagenPlato= async (img_url) => {
    try{
        return await sequelize.query('SELECT * FROM products WHERE img_url = ?', {replacements: [img_url], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}
exports.buscarIdPlato= async (id) => {
    try{
        return await sequelize.query('SELECT * FROM products WHERE id = ?', {replacements: [id], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}
exports.buscarDescripcionPlato= async (description) => {
    try{
        return await sequelize.query('SELECT * FROM products WHERE description = ?', {replacements: [description], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}
 
