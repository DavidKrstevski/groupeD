const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Schema } = mongoose;

const connectionString = "mongodb+srv://admin:admin@groupedcluster.qjwbz.mongodb.net/GroupedCluster?retryWrites=true&w=majority";

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
    }
});

const Person = mongoose.model('Person', personSchema);
const Group = mongoose.model('Group', groupSchema);

async function connect(){
    try{
        console.log("Trying to connect");
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("CONNECTED");
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
        return false;
    }
}

async function createGroup(groupData){
    try{
        let newGroup = new Group(groupData);
        await newGroup.save();
        return true;
    }catch (e) {
        console.log("Failed to save: " + e);
        return false;
    }
}

//Get
async function checkLogin(personData){
    try{
        let query = Person.findOne({username:personData.username});
        let result = await query.exec();
        if(!result)
            return null;
        let compare = await bcrypt.compare(personData.password, result.password);
        if(compare === true)
            return result;
        return null;
    }catch (e) {
        console.log("Failed to find: " + e);
        return false;
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
        return false;
    }
}

async function getPersonById(personId){
    try{
        let result = await Person.findOne({_id:personId});
        return result;
    }catch (e) {
        console.log("Failed to find: " + e);
        return false;
    }
}
async function getGroupByCode(groupCode){
    try{
        return await Group.findOne({groupCode: groupCode});
    }catch (e) {
        console.log("Failed to find: " + e);
        return false;
    }
}
//Delete
async function deletePersonByName(personName){
    try{
        let result = await Person.deleteOne({username:personName});
        if(result.deletedCount === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to delete: " + e);
        return false;
    }
}

async function deletePersonById(personId){
    try{
        let result = await Person.deleteOne({_id:personId});
        if(result.deletedCount === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to delete: " + e);
        return false;
    }
}

//Update
async function updatePersonByName(personName, update){
    try{
        let result = await Person.updateOne({username:personName}, update);
        if(result.nModified === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to update: " + e);
        return false;
    }
}

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
        return false;
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
        if(result.nModified === 0)
            return false;
        return true;
    }catch (e) {
        console.log("Failed to update: " + e);
        return false;
    }
}

async function _hash(password){
    try{
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }catch (e) {
        console.log("Failed to hash: " + e);
        return false;
    }
}

module.exports = {
    Person,
    Group,
    connect,
    savePerson,
    createGroup,
    checkLogin,
    getPersonByName,
    getPersonById,
    getGroupByCode,
    deletePersonByName,
    deletePersonById,
    updatePersonByName,
    addGroupToPerson,
    addPersonToGroup
}