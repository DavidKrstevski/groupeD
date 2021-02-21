const express = require('express');
const router = express.Router();
const database = require('../database');

const User = require('../database').Person;

router.post('/register',(req,res,next) => {
    let newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    database.savePerson(newUser).then(r => res.send(r));
});

router.post('/login',(req,res,next) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
    };
    database.checkLogin(newUser).then(r => res.send(r));
});

router.get('/profile',(req,res,next) => {
    database.getPersonByName(req.body.username).then(r => {
        let sendingObject = {
            username:r.username,
            groups:r.groups,
        }
        res.send(sendingObject);
    })
});

module.exports = router;
