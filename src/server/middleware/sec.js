var logger = require('../util/logger')(__filename);


function ensureAuthenticated (req, res, next) {
       if (req.session.me) {
           next();
       } else {
           res.send(400, 'Not connected');
       }

}
function ensureNonAuthenticated (req, res, next) {
       if (!req.session.me) {
           next();
       } else {
           res.send(400, 'Already connected');
       }

}
module = module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    ensureNonAuthenticated: ensureNonAuthenticated
};

