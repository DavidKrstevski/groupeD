const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const group = require('./routes/group');
const database = require('./database');

database.connect();

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/user',user);
app.use('/group',group);

app.get('/', (req,res) => {
    res.send('Invalid Enpoint');
})

app.listen(port, () => {
   console.log('Server started on port '+ port);
});