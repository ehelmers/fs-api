var connection = require("./database");
var userService = require('./user');


//User object constructor
var User = function(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
};

User.createUser = (newUser, result) => {
    connection.query("insert into user set ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

User.getAllUsers = (result) => {
    connection.query("select * from user", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = User;