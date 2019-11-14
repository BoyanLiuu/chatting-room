const { check, validationResult } = require('express-validator');
exports.helper = [
    // Check whether username is empty or not, and post error message associate with current validator
    check('username').not().isEmpty().isLength({
        min: 5
    }).withMessage('Username is required and must be at least 5 characters.'),
    check('email').not().isEmpty().isEmail()
    .withMessage('Email is invalid'),
    check('password').not().isEmpty()
    .withMessage('Password is required and must be at least 5 characters.'),
]

exports.postValidation = function (req, res, next) {
    const err = validationResult(req);
    //find errors and convert to array
    const reqErrors = err.array();
    const errors = reqErrors.filter(e => e.msg !== 'Invalid value');
    let messages = [];
    //loops through erros and push them into messages array
    errors.forEach((error) => {
        messages.push(error.msg);
    });
    //check if we have error or not
    if (messages.length > 0) {
        // Store error into flash , so we display it later
        req.flash('error', messages);
        res.redirect('/signup');
    }
    else{
        return next()
    }

}