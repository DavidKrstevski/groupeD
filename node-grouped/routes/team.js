const express = require('express');
const router = express.Router();
const database = require('../database');

router.post('/create',(req,res,next) => {
    database.createTeam(req.cookies.groupCode, req.body.teamName).then(r => {
        res.send(r);
    })
});

router.post('/delete',(req,res,next) => {
    database.deleteTeam(req.cookies.groupCode, req.body.teamName).then(r => {
        res.send(r);
    })
});

router.post('/addUser',(req,res,next) => {
    database.addUserToTeam(req.cookies.groupCode, req.body.teamName, req.body.username).then(r => {
        res.send(r);
    })
});

router.post('/kickUser',(req,res,next) => {
    database.deleteUserFromTeam(req.cookies.groupCode, req.body.teamName).then(r => {
        res.send(r);
    })
});

router.put('/changeName',(req,res,next) => {
    database.changeTeamName(req.cookies.groupCode, req.body.teamName, req.body.newName).then(r => {
        res.send(r);
    })
});

module.exports = router;
