const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    console.log('working -- getAllUsers')
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    res.locals.users = users;
    console.log(res.locals.users)
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {

  const {username, password} = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({username: username, password: hash})
        .then(newUser => {
          res.locals.user = newUser;
          next()
        })
        .catch(err => {
          res.redirect('/signup')
          next(err)
        });
    })
    .catch(err => next(err));

};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  const {username, password} = req.body;


  User.findOne({username: username})
    .then((user) => {
      if (user) { // there is a match
        bcrypt.compare(password, user.password)
          .then(result => {
            if (result) {
              res.locals.user = user;
              return next();
            } else {
              res.redirect('/signup');
            }
          })
          .catch(err => { 
            next(err)
          })
      } else {
        res.redirect('/signup');
      } 
    })
    .catch(err => next(err));


};

module.exports = userController;
