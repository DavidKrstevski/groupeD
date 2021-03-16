const express = require('express');
const router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');

router.post('/create',(req,res,next) => {
    jwt.verify(req.cookies.userId, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        let newUserList = [];
        newUserList.push(decoded);
        _createNewGroupCode().then(codeResult => {
            let newGroup = {
                groupName: req.body.groupName,
                groupCode: codeResult,
                userList: newUserList,
                adminList: newUserList
            };
            database.createGroup(newGroup).then(r => database.addGroupToPerson(decoded, codeResult).then(r => {
                res.clearCookie("groupCode");
                res.cookie("groupCode", codeResult, {httpOnly: true});
                res.send(r)
            }));
        });
    });
});

router.post('/join',(req,res,next) => {
    jwt.verify(req.cookies.userId, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.addGroupToPerson(decoded, req.body.groupCode).then(r => {
            if(r)
                database.addPersonToGroup(req.body.groupCode, decoded).then(r => {
                    res.clearCookie("groupCode");
                    res.cookie("groupCode", req.body.groupCode, {httpOnly: true});
                    res.send(r)
                });
            else
                res.send(r);
        });
    });
});

router.post('/addAdmin',(req,res,next) => {
    database.addAdmin(req.cookies.groupCode, req.body.userName).then(r => {
        res.send(r);
    })
});

router.post('/kickUser',(req,res,next) => {
    database.kickUser(req.cookies.groupCode, req.body.userName).then(r => {
        res.send(r);
    })
});

router.post('/isAdmin',(req,res,next) => {
    jwt.verify(req.cookies.userId, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err){
            res.send(false);
        }

        database.isAdmin(req.cookies.groupCode, decoded).then(r => {
            res.send(r);
        })
    });
});

router.post('/getGroup',(req,res,next) => {
    database.getGroupByCode(req.cookies.groupCode).then(r => {
        res.send(r);
    })
});

router.put('/changeName',(req,res,next) => {
    database.changeGroupName(req.cookies.groupCode, req.body.newName).then(r => {
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
