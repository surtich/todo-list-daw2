var userManager = require('../manager/user'),
    sec = require('../middleware/sec'),
    logger = require('../util/logger')(__filename);

function addServices(app) {
    app.post('/signup', sec.ensureNonAuthenticated, registerUser);
    app.get('/signin/:user/:password', sec.ensureNonAuthenticated, login);
    app.get('/me', sec.ensureAuthenticated, me);
    app.get('/signout', sec.ensureAuthenticated, disconnect);
}

function registerUser(req, res) {
    userManager.registerUser(req.body.user, req.body.email, req.body.password, function(err, msg) {

        if (err === 400) {
            logger.error(err);
            return res.send(400, msg);
        } else if (err) {
            logger.error(err);
            return res.send(500);
        }

        logger.info(msg);

        res.json({
            status: 200,
            msg: msg
        });
    });
}

function login(req, res) {
    userManager.checkPassword(req.params.user, req.params.password, function(err, msg, user) {

        if (err === 400) {
            logger.error(err);
            return res.send(400, msg);
        } else if (err) {
            logger.error(err);
            return res.send(500);
        }
        
        logger.info(msg);
        
        
        req.session.me = user._id;

        res.json({
            status: 200,
            msg: msg,
            user: 'Connected as ' + user._id
        });
    });
}

function me(req, res) {
    if (req.session.me) {
        res.json({
            status: 200,
            me: req.session.me,
            msg: 'Connected as ' + req.session.me
        });
    } else {
        res.send(400, 'Not connected');
    }
    
}

function disconnect(req, res) {
    req.session.destroy();
    res.json({
        status: 200,
        msg: 'Now you are not connected'
    });
}




module = module.exports = addServices;

