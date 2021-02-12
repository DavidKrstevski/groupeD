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
                res.send('true')
            else
                res.send('false')
    });
    res.send('REGISTER');
});

router.get('/profile',(req,res,next) => {
    database.getPersonByName(req.body.username).then(r => res.send(r))
    res.send('PROFILE');
});


module.exports = router;