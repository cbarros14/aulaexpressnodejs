const Usuario = require('../model/usuario');
const jwt = require('jsonwebtoken');

const loginService = (email) => Usuario.findOne({email});

const generateToken = (user, segredo) => jwt.sign({user}, segredo, );

const updateToken = (user) => {
    return Usuario.findByIdAndUpdate(user.id, user, {returnDocument: "after"})
}


module.exports = {loginService, updateToken, generateToken};