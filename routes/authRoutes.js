const requireLogin = require('../middlewares/requireLogin');
const passport = require('passport');
const mongoose = require('mongoose');

const Users = mongoose.model('users');

module.exports = (app) => {
    //tells passport to get a certain scope when fetching in google
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //grabs the information in a token form
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/')
        }
    );

    //logout user
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    //user that is already logged in
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })
};