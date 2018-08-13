const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentsSchema = new Schema(
    {
        paidDate: String,
        paidAmount: Number,
    }
)

//Subdoc of Participants
module.exports = paymentsSchema;