const mongoose = require('mongoose');
const Wins = mongoose.model('wins');
const keys = require('../config/keys')

module.exports = (app) => {
    app.get('/api/fetch_wins', async (req, res) => {
        const wins = await Wins.findById({_id: keys.winId})
        res.send(wins);
    })

    //Update Wins
    app.post('/api/update_wins', async (req, res) => {
        const { update } = req.body
        await Wins.update({_id: req.user}, update)
        const wins = await Wins.findById({_id: keys.winId})
        res.send(wins);
    })
}

