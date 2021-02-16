const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Schema } = mongoose;

const connectionString = "mongodb+srv://admin:admin@groupedcluster.qjwbz.mongodb.net/GroupedCluster?retryWrites=true&w=majority"

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
    joinCode:{
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

const Person = mongoose.model('Person', personSchema)
const Group = mongoose.model('Group', groupSchema)

async function connect(){
    try{
        console.log("Trying to connect");
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("CONNECTED");
    }catch (e) {
        console.log("Connection Failed: " + e)
    }
}

//Save
async function savePerson(personData){
    try{
        personData.password = await _hash(personData.password)
        let newPerson = new Person(personData)
        await newPerson.save()
    }catch (e) {
        console.log("Failed to save: " + e)
    }
}

async function createGroup(groupData){
    try{
        let newGroup = new Group(groupData)
        console.log(newGroup);
        await newGroup.save()
    }catch (e) {
        console.log("Failed to save: " + e)
    }
}

//Get
async function checkLogin(personData){
    try{
        let query = Person.findOne({username:personData.username})
        //query.select("name", "age")
        let result = await query.exec()
        if(!result)
            return false;
        let compare = await bcrypt.compare(personData.password, result.password);
        return compare;
    }catch (e) {
        console.log("Failed to find: " + e)
    }
}

async function getPersonByName(personName){
    try{
        let query = Person.findOne({username:personName})
        //query.select("name", "age")
        let result = await query.exec()
        return result;
    }catch (e) {
        console.log("Failed to find: " + e)
    }
}

async function getPersonById(personId){
    try{
        let query = Person.findOne({_id:personId})
        //query.select("name", "age")
        let result = await query.exec()
    }catch (e) {
        console.log("Failed to find: " + e)
    }
}
async function getGroupByCode(groupCode){
    try{
        let result = await Group.findOne({groupCode:groupCode})
        return result;
    }catch (e) {
        console.log("Failed to find: " + e)
    }
}
//Delete
async function deletePersonByName(personName){
    try{
        let result = await Person.deleteOne({username:personName})
        if(result.deletedCount === 0)
            console.log(personName + " does not exist")
    }catch (e) {
        console.log("Failed to delete: " + e)
    }
}

async function deletePersonById(personId){
    try{
        let result = await Person.deleteOne({_id:personId})
        if(result.deletedCount === 0)
            console.log("User with Id:" + personId + " does not exist")
    }catch (e) {
        console.log("Failed to delete: " + e)
    }
}

//Update
async function updatePersonByName(personName, update){
    try{
        let result = await Person.updateOne({username:personName}, update)
        if(result.nModified === 0)
            console.log(personName + " does not exist")
    }catch (e) {
        console.log("Failed to update: " + e)
    }
}

async function updatePersonById(personId, update){
    try{
        let result = await Person.updateOne({_id:personId}, update)
        if(result.nModified === 0)
            console.log("User with Id:" + personId + " does not exist")
    }catch (e) {
        console.log("Failed to update: " + e)
    }
}


async function _hash(password){
    try{
        let salt = await bcrypt.genSalt(saltRounds)
        let hash = await bcrypt.hash(password, salt)
        return hash
    }catch (e) {
        console.log("Failed to hash: " + e)
    }
}

module.exports = {
    Person,
    Group,
    connect,
    savePerson,
    getPersonByName,
    getPersonById,
    deletePersonByName,
    deletePersonById,
    updatePersonByName,
    updatePersonById,
    createGroup,
    getGroupByCode,
    checkLogin
}



