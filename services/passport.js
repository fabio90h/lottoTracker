const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');

const User = mongoose.model('users'); //will set a model class to User

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

//tells passport that it is okay to use google as authentication
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true, //to accept https
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingAccount = await User.findOne({ googleId: profile.id }); //Check to see if the user exists before creating one
        if (existingAccount) {
            done(null, existingAccount); //error object, what was done or created
        }
        else {
            const user = await new User( //Create a new user instance to MongoDB
                {
                    googleId: profile.id
                }
            ).save()
            done(null, user);
        }
    }
)); 