const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};
const axios = require("axios");


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

  console.log(res.locals)

  bcrypt.hash('req.body.password', 10)
    .then((hash) => {
      User.create({
        name: res.locals.fullname, 
        leetcode: res.locals.username,
        password: hash,
        totalSolved: res.locals.totalSolved,
        easySolved: res.locals.easySolved,
        mediumSolved: res.locals.mediumSolved,
        hardSolved: res.locals.hardSolved,
        acceptanceRate: res.locals.acceptanceRate,
        ranking: res.locals.ranking
      })
        .then(newUser => {
          res.locals.user = newUser;
          return next();
        })
        .catch(err => {
          res.redirect('/signup')
          return next(err);
        });
    })
    .catch(err => next(err));

};

userController.fetch = (req, res, next) => {

  const {firstname, lastname, username, password} = req.body;
  const fullname = firstname + ' ' + lastname;

  res.locals.fullname = fullname;
  res.locals.username = username;
  res.locals.password = password;

  axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`)
    .then(response => response.data)
    .then(data => {
      res.locals.totalSolved = data.totalSolved;
      res.locals.easySolved = data.easySolved;
      res.locals.mediumSolved = data.mediumSolved;
      res.locals.hardSolved = data.hardSolved;
      res.locals.acceptanceRate = data.acceptanceRate;
      res.locals.ranking = data.ranking;
      return next();
    })
    .catch(err => console.log(err));

}

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
