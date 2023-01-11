const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');



const userSchema = new Schema({
  fullname: {type: String, required: true, unique: true},
  leetcode: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  totalSolved: {type: Number, required: true},
  easySolved: {type: Number, required: true},
  mediumSolved: {type: Number, required: true},
  hardSolved: {type: Number, required: true},
  acceptanceRate: {type: Number, required: true},
  ranking: {type: Number, required: true},

});

module.exports = mongoose.model('User', userSchema);
