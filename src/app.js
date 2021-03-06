const express = require('express');
const app = express();
const port = 3006;
const auth = require('./routes/auth');
const pedidos = require('./routes/pedidos')
const users = require('./routes/users')
const platos = require('./routes/platos')

app.use(express.json());

app.use('/auth',auth);
app.use('/perfil', users);
app.use('/platos', platos);
app.use('/pedidos', pedidos);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});