const authenticationController = {};
const User = require ('../models/User');
const Session = require('../models/Session');


authenticationController.authenticateUser = (req, res, next) => {

  next();
}