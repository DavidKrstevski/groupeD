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

router.post('/myGroups',(req,res,next) => {
    database.getPersonById(req.body._id).then(r => {
        res.send(r.groups);
    })
});

module.exports = router;
