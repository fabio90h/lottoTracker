const mongoose = require('mongoose');
const { Schema } = mongoose;
const Scrapes = require('./Scrapes');

const winsSchema = new Schema(
    {
        megaWin: [Scrapes],
        megaPics: [String],
        
        powerWin: [Scrapes],
        powerPics: [String],
    }
);

mongoose.model('wins', winsSchema); //load the mongo