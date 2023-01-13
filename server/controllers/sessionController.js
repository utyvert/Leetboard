const authenticationController = {};
const User = require ('../models/User');
const Session = require('../models/Session');


const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  console.log(req)
  if (req.cookies.ssid) {
    Session.findOne({cookieId: req.cookies.ssid})
      .then(session => {
        console.log('Session is here?', session);
        if (session) {
          next();
        } else {
          // return (next({
              // type: 'redirect,
              // url: 'redirect url'
            // log: 'session not found',
            //  message: {err: kjajsdkjasd}
          //}))
          res.redirect('/login');
        }
      })
      .catch(err => next(err));
  } else {
    res.redirect('/login');
  }

};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code heres
  const {_id} = res.locals.user;

  Session.create({ cookieId: _id })
    .then(session => {
      console.log(session)
      return next();
    })
    .catch(err => next(err))
  

};

module.exports = sessionController;
