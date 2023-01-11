const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const authenticationController = require('./controllers/authenticationController');


const PORT = process.env.PORT || 3001;

const mongoURI = process.env.NODE_ENV = 'mongodb+srv://utkarshuppal:diamond123@leetboard.nezoyd9.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(mongoURI);


app.use(express.json()); // to handle json data in request bodies
app.use(express.urlencoded());
app.use(cookieParser());

// handle incoming GET request to '/'
app.get('/' ,(req, res) => {

    res.send('Hey there!');
});

app.get('/leaderboard', userController.fetch, userController.getAllUsers, (req, res) => {
    console.log('working -- leaderboard')
    const test = 'test'
    res.locals.test = test;
    res.status(200).json({test: test});
});

app.get('/create', userController.fetch, userController.createUser , (req, res) => {

    res.status(200).json(res.locals.user);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;
