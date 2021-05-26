const sequelize = require('../database/conexion');

exports.buscarUser = async (user_name) => {
    try{
        return await sequelize.query('SELECT * FROM users WHERE user_name = ?', {replacements: [user_name], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}

exports.verificarEmail = async (mail) => {
    try{
        return await sequelize.query('SELECT * FROM users WHERE mail = ?', {replacements: [mail], type: sequelize.QueryTypes.SELECT});
    }catch (error){
        console.log(error);
    }
}

exports.insertUsers = async (user_name, password, if_admin, full_name, phone, mail, address) => {
    const users = await sequelize.query(`INSERT INTO users (user_name, password, if_admin, full_name, phone, mail, address) VALUE ( ?, ?, ?, ?, ?, ?, ?)`, 
    {replacements: [user_name, password, if_admin, full_name, phone, mail, address], type: sequelize.QueryTypes.INSERT})
    return
}

exports.editarUsers = async (newUser_name, newPassword, newFullname, newPhone, newMail, newAddress, id) => {
    const users = await sequelize.query('UPDATE users SET user_name = ?, password = ?, full_name = ?, phone = ?, mail = ?, address = ? WHERE id = ?', 
    {replacements: [newUser_name, newPassword, newFullname, newPhone, newMail, newAddress, id]})
    return
}

exports.deleteUsers = async (id) => {
    try{
        return await sequelize.query('DELETE FROM users WHERE id = ?', {replacements: [id]});
    }catch (error){
        console.log(error);
    }
}