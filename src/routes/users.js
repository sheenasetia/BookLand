const express = require('express');
const router = express.Router();
const UsersModel = require('./../models/users')

router.get('', (req, res) => {
    UsersModel.findUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/add', (req, res) => {
    console.log(req);
    UsersModel.addUser(req, (error, response) => {
        if (error) {
            console.log("Error is: ", error);
            res.send(error);
        }
        if (response) {
            req.session.userName = response[0].userName
            //console.log("Success response is: ", JSON.stringify(response));
            res.send('User added successfully');
        }
    });
});

router.post('/login', (req, res) => {
    UsersModel.findUserForLogin(req, (error, response) => {
        if (error) {
            console.log("Error is: ", error);
            return res.status(400).send();
        }
        if (response) { 
            if (response.length>0) {
                req.session.userName = response[0].userName
                console.log(req);
                console.log("Success response is: ",JSON.stringify(response));
                res.send(response)
            } else {
                return res.status(404).send();
            }
        }

    });
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    return res.status(200).send();
})

router.put('/update', (req, res) => {
    UsersModel.updateUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;