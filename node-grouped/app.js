const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const group = require('./routes/group');
const team = require('./routes/team');
const database = require('./database');


database.connect().then(r => console.log("CONNECTED"));

const html = __dirname + '/public/dist/groupeD';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', express.static(html))
app.use('/login', express.static(html))
app.use('/register', express.static(html))
app.use('/createGroup', express.static(html))
app.use('/home', express.static(html))
app.use('/group', express.static(html))
app.use('/joinGroup', express.static(html))
app.use('/**', express.static(html))

app.use('/user',user);
app.use('/group',group);
app.use('/team',team);

app.get('/', (req,res) => {

})

app.listen(process.env.SERVER_PORT, () => {
   console.log('Server started on port '+ process.env.SERVER_PORT);
   console.log(html)
});
