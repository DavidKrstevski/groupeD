const express = require('express');
const router = express.Router();
const database = require('../database');

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

    database.checkLogin(newUser).then(r => {
        if(r === null)
            res.send(false);

        res.cookie("userId", r._id, {httpOnly: true});
        res.send(true);
    });
});

router.post('/logout',(req,res,next) => {
    res.clearCookie('userId');
    res.send(true);
});

router.post('/myGroups',(req,res,next) => {
    database.getPersonById(req.cookies.userId).then(r => res.send(r.groups))
});

module.exports = router;
