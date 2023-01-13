const cookieController = {};
const User = require('../models/User');

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi');
  // next();
  const temp = Math.floor(Math.random() * 100)
  res.cookie('secret', temp)
  next()
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  const {_id} = res.locals.user;
  // console.log(res.locals.newUser._id)
  res.cookie('ssid', _id, {httpOnly: true})
  return next()
}

module.exports = cookieController;
