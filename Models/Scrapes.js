const mongoose = require('mongoose');
const { Schema } = mongoose;

const scrapeSchema = new Schema(
    {
        winDate: String,
        winAmount: String
    }
)

module.exports = scrapeSchema;