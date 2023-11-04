const Usuario = require('../model/usuario');

const findByIdUsuario = (id) => {
    return Usuario.findById(id);
}

const findAllUsuarios = () => {
    return usuario.find();
}

const createUsuario = (usuario) => {
    return Usuario.create(usuario);
}

const updateUsuario = (id, usuario) => {
    return Usuario.findByIdAndUpdate(id, usuario, {returnDocument: "after"});
}

const deleteUsuario = (id) => {
    return Usuario.findByIdAndRemove(id);
}

module.exports = {
    findByIdUsuario,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}