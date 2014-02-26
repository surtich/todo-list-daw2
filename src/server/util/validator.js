var validator = require('validator');
	Validator = validator.Validator,
	

Validator.prototype.ObjectID = function () {
    if (this.str.length !== 12 && (this.str.length !== 24 || ! /^[0-9a-fA-F]+$/.test(this.str))) {
        this.error('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    }
    return this; //(for chaining)
};


Validator.prototype.isBoolean = function () {
    if (this.str.toLowerCase() !== "true" && this.str.toLowerCase() !== "false" ) {
        this.error('Argument passed in must be a boolean ("true" or "false")');
    }
    return this; //(for chaining)
};

module.exports = validator;