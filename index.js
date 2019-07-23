const express = require('express'); 
//require: requires a string express, searches for a string express within out file
//express is one of the imports
//express requires all of the other dependencies that were imported 

var fs = require("fs");
//app is a constant variable
//app is a custom class that express gives
//the custom class lets us define the get() method, which we do below 


//creating a path (action, endpoint)
//by requresting this path, the API will send the message Hello World
//the above format will be used for most get requests 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/api/users', (req,res) => {
fs.readFile("./data/users.json", function(err, data){
    if(err) throw err;
    var users = JSON.parse(data);
    res.json(users); //this reads the data from the .json file, and returns to user
    });
});
//for every endpoint, use the get() method  
//send a JSON array of all users


//HOMEWORK 
app.get('/api/properties', (req,res) => {
fs.readFile("./data/properties.json", function(err, data){
    if(err) throw err;
    var properties = JSON.parse(data);
    res.json(properties); 
})
    res.send(properties);
});
//send a JSON array of all properties 

//HOMEWORK 
app.get('/api/properties:userId', (req,res) => {
    fs.readFile("./data/properties.json", function(err, data){
        if(err) throw err;
        var properties = JSON.parse(data);
        var foundProperties = properties.filter(function(property){
            return property.id == req.params.userId;
        });
    res.json(foundProperties);
    })
});
//send a JSON array of all the 
//properties belonging to the user with the given userId 
    //get all the properties (make sure userId is stored on the property)
    //filter the properties to only look at those that have the userId given
    //reference netifly 



app.post('/api/register', (req,res) => {
    const userPostData = req.body;

    fs.readFile("./data/users.json", function(err,data){
        if(err) throw err;
        var users= JSON.parse(data);

        //HOMEWORK: check if postData email is duplicated in users array
            //if it is, send an error
            //res.status(. . .).send(. . .)
        var foundUser = users.filter(function(user){
            return user.email == userPostData.email;
        })[0];

        if(foundUser){
            res.status(400).send("Username already exists");
        }
        //HOMEWORK: if not, add a new user to the array
        //push(newUser) edits the users variable locally 
        else{
            var newUser = {
                id: userPostData.id,
                firstName: userPostData.firstName,
                lastName: userPostData.lastName,
                email: userPostData.email,
                password: userPostData.password
            }
            users.push(newUser); 
        }
        fs.writeFile("./data/users.json", JSON.stringify(users), function(err){
            if(err)throw err;
            //send the correct response
            //res.send(. . .)
            else{
                res.send(newUser);
            }
        });
    });
});

//create another entry in the users JSON array.
//response depends on the API designer
//usually, sends back the user that was created 

//req requests information from the frontend
app.post('/api/authenticate',(req, res) => {
    const userPostData = req.body;
    //(later)update the user to have a logged in status
    //(now) check whether authentification is correct
    //and send back authenticated user 
    // connection.query("...SQL HERE")
    // SQL
        // SELECT * (get me everything)
        // FROM <table name> (from the table)
    // Instead of 'data' the convention is to call it `db_res` (db_response)
    fs.readFile("./data/users.json", function(err, data){
        if(err) throw err;
        var users = JSON.parse(data);
        var foundUser = users.filter(function(user) {
            return user.email == userPostData.email && user.password == userPostData.password;
        })[0];
        //if i found a user, send the user back
        //if not, send an error
        if(foundUser){
            res.send(foundUser);
        }
        else{
            //HTTP response code 
            //200 means OK (no error)
            //300 means redirect
            //400 means user error
            //500 means server error 
            res.status(400).send("fail")
        }
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

