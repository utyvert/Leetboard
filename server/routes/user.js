const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// router.get('/:username', userController.getLeaderboard, userController.getParamFromRanked, (req, res) => {
//   console.log('working -- paramsUsername')
//   console.log(res.locals.user)
//   res.status(200).json(res.locals.user);

// });

router.post('/:username', userController.getLeaderboard, userController.getParamFromRanked, (req, res) => {
  console.log('working -- user router')
  console.log(res.locals.user)
  res.status(200).json(res.locals.user);
});


module.exports = router;