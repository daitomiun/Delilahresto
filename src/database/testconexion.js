const sequelize = require("./conexion");

sequelize.authenticate().then( ()=> {
    console.log('Conectado');
})
.catch(err => {
    console.log('Error de conexión: ', err)
})
.finally( () =>{
    sequelize.close();
});