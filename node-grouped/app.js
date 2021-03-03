const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const group = require('./routes/group');
const database = require('./database');


database.connect().then(r => console.log("CONNECTED"));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user',user);
app.use('/group',group);

app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
})

app.listen(process.env.SERVER_PORT, () => {
   console.log('Server started on port '+ process.env.SERVER_PORT);
});