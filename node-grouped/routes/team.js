const express = require('express');
const router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');

router.post('/create',(req,res,next) => {
    jwt.verify(req.cookies.groupCode, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.createTeam(decoded, req.body.teamName).then(r => {
            res.send(r);
        });
    });
});

router.post('/delete',(req,res,next) => {
    jwt.verify(req.cookies.groupCode, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.deleteTeam(decoded, req.body.teamName).then(r => {
            res.send(r);
        });
    });
});

router.post('/addUser',(req,res,next) => {
    jwt.verify(req.cookies.groupCode, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.addUserToTeam(decoded, req.body.teamName, req.body.username).then(r => {
            res.send(r);
        });
    });
});

router.post('/kickUser',(req,res,next) => {
    jwt.verify(req.cookies.groupCode, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.deleteUserFromTeam(decoded, req.body.teamName).then(r => {
            res.send(r);
        });
    });
});

router.put('/changeName',(req,res,next) => {
    jwt.verify(req.cookies.groupCode, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.changeTeamName(decoded, req.body.teamName, req.body.newName).then(r => {
            res.send(r);
        });
    });
});

module.exports = router;
