const express = require('express');
const router = express.Router();
const database = require('../database');

const User = require('../database').Person;

router.post('/register',(req,res,next) => {
    let newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    database.savePerson(newUser);
    res.send('REGISTER');
});

router.get('/login',(req,res,next) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
    };
    database.checkLogin(newUser).then(r =>{
            if(r)
                console.log('true')
            else
                console.log('false')
    });
    res.send('LOGGED IN');
});

router.get('/profile',(req,res,next) => {
    database.getPersonByName(req.body.username).then(r => {
        var sendingObject = {
            username:r.username,
            groups:r.groups,
        }
        res.send(sendingObject);
        console.log(r)
    })
});

module.exports = router;