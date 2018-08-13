const keys = require('../config/keys');

module.exports = (req, res, next) => {
    if (req.user.id !== keys.userId) {
        return res.status(401).send({error: 'You must log in as Fabio' });
    }
    
    next();
}