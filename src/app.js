const express = require('express');
const app = express();
const port = 3006;
const auth = require('./routes/auth');
const users = require('./routes/users')

app.use(express.json());

app.use('/auth',auth);
app.use('/perfil', users);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});