const mongoose = require('mongoose');
const { Schema } = mongoose
const PaymentsSchema = require('./Payments');

const participantSchema = new Schema(
    {
        name: String,
        email: String,
        category: String,
        credit: {type: Number, default: 0},
        hide: { type: Boolean, default: false },
        payments: [PaymentsSchema],
        powerball: { type: Boolean, default: false },
        mega: { type: Boolean, default: false },
        _user: { type: Schema.Types.ObjectId, ref: 'users' }, //belong to Users
        dueDate: String,
    }
)

mongoose.model('participants', participantSchema);