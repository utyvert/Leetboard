const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};
const axios = require("axios");
const { isCompositeComponent } = require('react-dom/test-utils');
const { locals } = require('..');
const { useParams } = require('react-router');


/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getLeaderboard = (req, res, next) => {
  User.find({}, (err, users) => {
    console.log('working -- getAllUsers')
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    const sortedUsers = users.sort((a, b) => b.totalSolved - a.totalSolved);
    const rankedUsers = sortedUsers.map((user, index) => {
      return {...user, rank: index + 1};
    });
    
    // console.log(rankedUsers)
    res.locals.rankedUsers = rankedUsers;
    return next();
  });
};

userController.getUser = (req, res, next) => {
  console.log('working -- getUser')
  console.log(req.body);

  User.findOne({leetcode : req.body.username})
    .then(user => {
      if (user) {
        res.locals.user = user;
        return next();
      } else {
        res.redirect('/signup'); // ?
      }
    })
    .catch(err => next(err));
  };


  userController.getUserFromRanked = (req, res, next) => {
    const { rankedUsers } = res.locals;
    const user = rankedUsers.find(user => user._doc.leetcode === req.body.username);
    res.locals.user = user;
    return next();
  }


  userController.getParamFromRanked = (req, res, next) => {
    console.log(req.body);
    const { rankedUsers } = res.locals;
    const user = rankedUsers.find(user => user._doc.leetcode === req.params.username);
    res.locals.user = user;
    return next();
  }
  
  
/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {

  console.log('working -- createUser')
  // const {firstname, lastname, username, password} = req.body;


  bcrypt.hash(res.locals.password, 12)
    .then((hash) => {
      User.create({
        fullname: res.locals.fullname, 
        leetcode: res.locals.leetcode,
        password: hash,
        totalSolved: res.locals.totalSolved,
        easySolved: res.locals.easySolved,
        mediumSolved: res.locals.mediumSolved,
        hardSolved: res.locals.hardSolved,
        acceptanceRate: res.locals.acceptanceRate,
        ranking: res.locals.ranking
      })
        .then(newUser => {
          res.locals.thenUser = newUser;
          return next();
        })
        .catch(err => {
          // res.redirect('/signup') fix this
          return next(err);
        });
    })
    .catch(err => next(err));

};

userController.checkDB = (req, res, next) => {
  console.log('working -- checkDB')
  const {username} = req.body;
  User.findOne({leetcode: username})
    .then((user) => {
      if (user) { // there is a match
        res.redirect('/login')
      } else {
        console.log('no match')
        return next();
      }
    })
    .catch(err => next(err));
}


userController.fetch = (req, res, next) => {

  console.log('working -- fetch')
  const {firstname, lastname, username, password} = req.body;
  const fullname = firstname + ' ' + lastname;


  console.log('fullname: ', fullname, 'username: ', username);


  res.locals.fullname = fullname;
  res.locals.leetcode = username;
  res.locals.password = password;


  axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`)
    .then(response => response.data)
    .then(data => {
      if (data.status === "error") {
        res.redirect('/signup');
      } else {
        res.locals.totalSolved = data.totalSolved;
        res.locals.easySolved = data.easySolved;
        res.locals.mediumSolved = data.mediumSolved;
        res.locals.hardSolved = data.hardSolved;
        res.locals.acceptanceRate = data.acceptanceRate;
        res.locals.ranking = data.ranking;
        return next();
      }
    })
    .catch(err => console.log(err));

}





// For sessions
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
