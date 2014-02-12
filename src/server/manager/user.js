var userDAO = require('../dao/user'),
logger = require('../util/logger')(__filename),
check = require('../util/validator').check

function registerUser(user, email, password, callback) {

    try {
        check(user, 'Empty user is not allowed').notEmpty();
        check(email, 'Empty email is not allowed').notEmpty();
        check(password, 'Empty password is not allowed').notEmpty();
    } catch (err) {
        return callback(400, err.message);
    }

    var now = new Date();

    userDAO.save({
        _id: user,
        email: email,
        password: password,
        creationDate: now,
        modifiedDate: now
    }, function(err, user) {
        if (err && err.code === 11000) {
            callback(400, "the user already exists");
        } else {
            callback(err, "user added");
        }
    });
}

function checkPassword(userId, password, callback) {

    try {
        check(userId, 'Empty user is not allowed').notEmpty();     
        check(password, 'Empty password is not allowed').notEmpty();
    } catch (err) {
        return callback(400, err.message);
    }
	
    userDAO.get(userId, function(err, user) {
        if (err) {
            return callback(err);
        }
		
        if (!user || user.password !== password) {
            return callback(400, "User or password invalid");
        } else {
            return callback(null, "Password is valid", user);
        }
    });
}


module.exports = {
    registerUser: registerUser,
    checkPassword: checkPassword
};