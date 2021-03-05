const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Schema } = mongoose;
const env = require('dotenv/config');

//Schema and Models
const personSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groups: {
        type: [String],
        required: false
    } //Ids
});

const groupSchema = new Schema({
    groupName:{
        type: String,
        required:true
    },
    groupCode:{
        type: String,
        required:true
    },
    userList: {
        type: [String],
        required: true
    },
    adminList: {
        type: [String],
        required: true
    },
    teamsList: {
        type: [[String]],
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
const Group = mongoose.model('Group', groupSchema);

async function connect(){
    try{
        console.log("Trying to connect to the database");
        await mongoose.connect(process.env.DB_CON, { useNewUrlParser: true, useUnifiedTopology: true });
    }catch (e) {
        console.log("Connection Failed: " + e);
    }
}

//Save
async function savePerson(personData){
    try{
        let exists = await getPersonByName(personData.username);
        if(exists !== null)
            return false;
        personData.password = await _hash(personData.password);
        let newPerson = new Person(personData);
        await newPerson.save();
        return true;
    }catch (e) {
        console.log("Failed to save: " + e);
    }
}

async function createGroup(groupData){
    try{
        let newGroup = new Group(groupData);
        await newGroup.save();
    }catch (e) {
        console.log("Failed to save: " + e);
    }
}

//Get
async function checkLogin(personData){
    try{
        let result = await Person.findOne({username:personData.username});
        if(!result)
            return null;
        let compare = await bcrypt.compare(personData.password, result.password);
        if(compare === true)
            return result;
        return null;
    }catch (e) {
        console.log("Failed to find: " + e);
    }
}

async function getPersonByName(personName){
    try{
        let query = Person.findOne({username:personName});
        //query.select("name", "age");
        let result = await query.exec();
        return result;
    }catch (e) {
        console.log("Failed to find: " + e);
    }
}

async function getPersonById(personId){
    try{
        let result = await Person.findOne({_id:personId});
        return result;
    }catch (e) {
        console.log("Failed to find: " + e);
    }
}
async function getGroupByCode(groupCode){
    try{
        return await Group.findOne({groupCode: groupCode});
    }catch (e) {
        console.log("Failed to find: " + e);
    }
}

//Delete
async function deletePersonById(personId){
    try{
        let result = await Person.deleteOne({_id:personId});
        if(result.deletedCount === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to delete: " + e);
    }
}

//Update
async function addGroupToPerson(personId, groupCode){
    try{
        let person = await getPersonById(personId);
        let groups = [];
        if(person.groups !== null)
            groups = person.groups;
        groups.push(groupCode);

        let result = await Person.updateOne({_id:personId}, {groups:groups});
        if(result.nModified === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to update: " + e);
    }
}

async function addPersonToGroup(groupCode, personId){
    try{
        let group = await getGroupByCode(groupCode);
        let persons = [];
        if(group.userList !== null)
            persons = group.userList;

        for (let i = 0; i < persons.length; i++) {
            if(persons[i] === personId)
                return false;
        }

        persons.push(personId);
        let result = await Group.updateOne({groupCode:groupCode}, {userList:persons});
        return result.nModified === 1;
    }catch (e) {
        console.log("Failed to update: " + e);
    }
}

async function addAdmin(groupCode, userName){
    try {
        let person = await getPersonByName(userName);
        let group = await getGroupByCode(groupCode);
        group.adminList.push(person._id);
        let result = await Group.updateOne({groupCode:groupCode}, {adminList:group.adminList});
        return result.nModified === 1;
    }catch (e){
        console.log("Failed to update: " + e);
    }
}

async function kickUser(groupCode, userName){
    try {
        let person = await getPersonByName(userName);
        let group = await getGroupByCode(groupCode);
        group.userList.remove(person._id);
        let result = await Group.updateOne({groupCode:groupCode}, {userList:group.userList});
        return result.nModified === 1;
    }catch (e){
        console.log("Failed to update: " + e);
    }
}

//Checking

async function isAdmin(groupCode, personId){
    let group = await getGroupByCode(groupCode);
    return group.adminList.includes(personId);
}

async function _hash(password){
    try{
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }catch (e) {
        console.log("Failed to hash: " + e);
    }
}

module.exports = {
    connect,
    savePerson,
    createGroup,
    checkLogin,
    getPersonById,
    getGroupByCode,
    addGroupToPerson,
    addPersonToGroup,
    addAdmin,
    kickUser,
    isAdmin
}
