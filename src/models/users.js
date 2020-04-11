const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}) //to create a schema


const UsersModel = mongoose.model("Users" , usersSchema);
UsersModel.findUser = function (req, callBack) {

    UsersModel.find({ userName: req.session.userName }, callBack);
}

UsersModel.findUserForLogin = function (req, callBack) {
    let user = { userName: req.body.userName, password: req.body.password };
    UsersModel.find(user, callBack);
}

UsersModel.addUser = function (req, callBack) {
    let user = req.body;
    UsersModel.create(user, callBack);
}

UsersModel.updateUsers = function (req, callBack) {
    let query = { _id: req.body._id };
    let user = req.body;
    UsersModel.updateOne(query, user, callBack);
}

module.exports = UsersModel;


/* --------------- */

/*const UsersModel = mongoose.model("Users" , usersSchema);
UsersModel.findUsers = function(req, callBack) {
    let id=req.query.id;
    let query={};
    if(id) {
        query = { _id: id }
    }
    UsersModel.find(query,callBack)
    //UsersModel.find({},callBack)
      //call find function of mongoose which is same as find of mongodb
}

UsersModel.addUsers = function(req,callBack) {
    let user=req.body;
    UsersModel.create(user,callBack)
}

UsersModel.updateUsers = function(req,callBack) {
    let query= {_id:req.body._id};
    let user=req.body;
    UsersModel.updateOne(query,user,callBack)
    
}

module.exports = UsersModel;*/

/*------------------*/
