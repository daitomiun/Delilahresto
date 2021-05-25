const sequelize = require('../database/conexion');

exports.buscarUser = async (user_name) => {
    try{
        return await sequelize.query('SELECT * FROM users WHERE user_name = ?', {replacements: [user_name], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}

exports.insertUsers = async (user_name, password, if_admin, full_name, phone, mail, address) => {
    const bands = await sequelize.query(`INSERT INTO users (user_name, password, if_admin, full_name, phone, mail, address) VALUE ( ?, ?, ?, ?, ?, ?, ?)`, 
    {replacements: [user_name, password, if_admin, full_name, phone, mail, address], type: sequelize.QueryTypes.INSERT})
    return
}