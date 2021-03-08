const express = require('express');
const router = express.Router();
const database = require('../database');

router.post('/create',(req,res,next) => {
    console.log(req.cookies)
    let newUserList = [];
    newUserList.push(req.cookies.userId);
    _createNewGroupCode().then(codeResult => {
        let newGroup = {
            groupName: req.body.groupName,
            groupCode: codeResult,
            userList: newUserList,
            adminList: newUserList
        };
        database.createGroup(newGroup).then(r => database.addGroupToPerson(req.cookies.userId, codeResult).then(r => res.send(r)));
    });
});

router.post('/join',(req,res,next) => {
    database.addPersonToGroup(req.body.groupCode, req.cookies.userId).then(r => {
        if(r)
            database.addGroupToPerson(req.cookies.userId, req.body.groupCode).then(r => res.send(r));
        else
            res.send(r)
    });
});

router.post('/addAdmin',(req,res,next) => {
    database.addAdmin(req.body.groupCode, req.body.userName).then(r => {
        res.send(r);
    })
});

router.post('/kickUser',(req,res,next) => {
    database.kickUser(req.body.groupCode, req.body.userName).then(r => {
        res.send(r);
    })
});

router.post('/isAdmin',(req,res,next) => {
    database.isAdmin(req.body.groupCode, req.cookies.userId).then(r => {
        res.send(r);
    })
});

async function _createNewGroupCode(){
    let code = _getRandomInt(10000,100000);
    let group = await database.getGroupByCode(code);
    if(group !== null){
        return _createNewGroupCode();
    }
    return code.toString();
}

function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;
