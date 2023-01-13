const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');

const userRouter = require('./routes/user');


const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');
const authenticationController = require('./controllers/authenticationController');
const { log } = require('console');


const PORT = process.env.PORT || 3001;

const mongoURI = process.env.NODE_ENV = 'mongodb+srv://utkarshuppal:diamond123@leetboard.nezoyd9.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(mongoURI);

app.use(cors());
app.use(express.json()); // to handle json data in request bodies
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/user', userRouter);

// handle incoming GET request to '/'
app.get('/' ,cookieController.setCookie ,(req, res) => {

    res.sendFile(path.resolve(__dirname, '../public/index.html'));

});



app.get('/leaderboard', userController.getLeaderboard, (req, res) => {
    console.log('working -- leaderboard')
    // console.log(res.locals.rankedUsers)
    res.status(200).json(res.locals.rankedUsers);
});



app.post('/create', userController.checkDB, userController.fetch, userController.createUser , (req, res) => {

    res.status(200).redirect('/leaderboard')
});


// update users incrementally


const User = require('./models/User');
const axios = require('axios');
const { update } = require('./models/Session');


function updateUsers(){
    userController.getLeaderboard((req, res) => {
    console.log('working -- leaderboardupdater')
    // get list of users from the database
    res.locals.rankedUsers.forEach(user => {
            console.log('user', user);
            // make an API call for each user to update their stats
            axios.get(`https://leetcode-stats-api.herokuapp.com/${user.username}`)
            .then(response => {
                // update the user's stats in the database
                User.findOneAndUpdate({username: user.username}, {$set: {
                    totalSolved: response.data.totalSolved,
                    easySolved: response.data.easySolved,
                    mediumSolved: response.data.mediumSolved,
                    hardSolved: response.data.hardSolved,
                    acceptanceRate: response.data.acceptanceRate
                }}, {new: true}, (err, updatedUser) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully updated user ${user.username}`);
                    }
                });
            })
            .catch(err => console.log(err));
        });
    });
}

// updateUsers();


//



/**
 * 404 handler
 */
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
});

/**
   * Global error handler
   */
app.use((err, req, res, next) => {
    console.log(err);
    // if err.type === 'redirect' res.redirect(err.url)
    res.status(500).send({ error: err });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;

