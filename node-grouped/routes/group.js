const express = require('express');
const router = express.Router();
const database = require('../database');

const Group = require('../database').Group;

router.post('/create',(req,res,next) => {
    let userId = req.body._id;
    let newUserList = [];
    newUserList.push(userId);
    createNewGroupCode().then(codeResult => {
        let newGroup = {
            groupCode: codeResult,
            userList: newUserList,
            adminList: newUserList
        };
        database.createGroup(newGroup).then(r => {
            database.addGroupToPerson(req.body._id, codeResult).then(r => res.send(r));
        });
    });
});

router.post('/join',(req,res,next) => {
    database.addPersonToGroup(req.body.groupCode, req.body._id).then(r => {
        if(r !== false)
            database.addGroupToPerson(req.body._id, req.body.groupCode).then(r => res.send(r));
        else
            res.send(r)
    });
});

async function createNewGroupCode(){
    let code = getRandomInt(10000,100000);
    let group = await database.getGroupByCode(code);
    if(group !== null){
        return createNewGroupCode();
    }
    return code.toString();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;