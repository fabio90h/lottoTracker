const mongoose = require('mongoose');
const { Schema } = mongoose;
const Wins = require('./Wins');

const userSchema = new Schema(
    {
        googleId: String,
        megaWin: [Wins],
        powerWin: [Wins],
    }
);

mongoose.model('users', userSchema); //load the mongo