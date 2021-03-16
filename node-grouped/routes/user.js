const express = require('express');
const router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');

router.post("/register",(req,res,next) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
    };
    database.savePerson(newUser).then(r => res.send(r));
});

router.post("/login",(req,res,next) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
    };

    database.checkLogin(newUser).then(r => {
        if(r === null)
            res.send(false);

        const accessToken = jwt.sign(r._id.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        res.cookie("userId", accessToken, {httpOnly: true});
        // res.header("Access-Control-Allow-Origin", "*")
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // res.header("Access-Control-Allow-Credentials", "*")

        res.send(true);
    });
});

router.post("/logout",(req,res,next) => {
    res.clearCookie("userId");
    res.send(true);
});

router.post("/myGroups",(req,res,next) => {
    jwt.verify(req.cookies.userId, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.getPersonById(decoded).then(r => res.send(r.groups));
    });
});

router.post("/getUsername",(req,res,next) => {
    jwt.verify(req.cookies.userId, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.getPersonById(decoded).then(r => res.send(r.username));
    });
});

router.post("/getUsernameWithoutCookie",(req,res,next) => {
    database.getPersonById(req.body._id).then(r => res.send( { username : r.username }));
});

module.exports = router;
