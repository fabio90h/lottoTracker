const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./Models/Users'); //Will create the users models for the passport to use
require('./Models/Participants');
require('./Models/Wins');
require('./services/passport'); //will execute the code inside passport.js
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());

app.use(
    cookieSession(
        {
            maxAge: 30 * 24 * 60 * 60 * 1000, //in milisec
            keys: [keys.cookieKeys],
        }
    )
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/participantRoutes')(app);
require('./routes/winRoutes')(app);
require('./scheduler')

if (process.env.NODE_ENV === 'production') {
    // Express will serve up the production assets
    // like out main.js file, or main.css file
    app.use(express.static('client/build'));
    
    // Express will serve up the index.html file
    // if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);