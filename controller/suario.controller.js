const usuarioService = require('../service/usuario.service');
const mongoose = require('mongoose');


const find = async (req, res) => {
    try{
    const id = mongoose.Types.ObjectId(req.params.id);    
    let found = false;   

    const usuario = await usuarioService.findByIdUsuario(id);

    if(usuario != null){
        found = true;
    }
    
    if (!found) {
            return  res.status(404).send({message: "usuario nao encontrado, tente outro ID"});
    }
    
    return res.status(200).send(usuario);
    
    } catch (err){
        console.log(`erro ${err}`);
        return res.status(500).send("erro no servidor, tente mais tarde");
        
    }       
}


const findAllUsuarios = async (req, res) => {
    return res.status(200).send(await usuarioService.FindAllUsuarios());
    
}

const createUsuario = async (req, res) => {
    const empresa = req.body;
    
    if(Object.keys(usuario).length === 0){
        return res.status(400).send({message: "corpo da mensagem esta vazio"});

    }

    if(!usuario.nome) {
        return res.status(400).send({message: "O campo NOME nao foi encontrado"})
    }

    if(!usuario.email) {
        return res.status(400).send({message: "O campo email nao foi encontrado"})
    }
    
    return res.status(201).send(await usuarioService.createUsuario(usuario));
}


const updateUsuario =async (req, res) =>{
    const id = req.params.id;
    const usuario = req.body;
   

    if(Object.keys(usuario).length === 0){
        return res.status(400).send({message: "corpo da mensagem esta vazio"});

    }

    if(!usuario.nome) {
        return res.status(400).send({message: "O campo NOME nao foi encontrado"})
    }

    if(!usuario.email) {
        return res.status(400).send({message: "O campo email nao foi encontrado"})
    }

    return res.status(200).send(await usuarioService.updateUsuario(id, usuario));

}

const deleteUsuario = async (req, res) =>{
    const id = req.params.id;  
    return res.status(200).send(await usuarioService.deleteUsuario(id));
}

//exportação dos modulos
module.exports = {
    findAllUsuarios,
    createUsuario,
    find,
    updateUsuario,
    deleteUsuario

}