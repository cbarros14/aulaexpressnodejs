const express = require('express');
const connectToDatabase = require('./database/database');
const authService = require('./service/auth.service');
const app = express();
const usuario = require("./router/usuario.router");
const jwt = require("jsonwebtoken");

connectToDatabase();

//porta servidor mongo
const port = 3000;

//segredo Json Web Token
const segredo = "6542bfyhjnfh6j42mhjkm54"

app.use(express.json());


app.get("/", (req, res) => {
    console.log(token());
    res.send("hello word");
} )

app.post('/login', async (req, res) => {
    try{ 
        const {email, senha} = req.body;
        const user = await authService.loginService(email);

        if(!user){
           return  res.status(400).send({message: "Usuario nao encontrado"});
        }

        if(senha != user.senha){
            return res.status(400).send({message:"senha invalida"});
        }
        
        const token = authService.generateToken(user, segredo);
        res.status(200).send({user, token});
               
    }catch(err){
        console.log(`erro ${err}`);
    }
});

app.get('/token', (req, res) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({message:"Token nao informado"})
    }
    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        return res.status(401).send({message:"Token invalido"})
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/id.test(scheme)){
        return res.status(401).send({message:"Token mal formatado"})
    }

    jwt.verify(token, segredo, async (err, decoded) => {

        if(err){
            console.log(`erro: ${err}`);
            return res.status(500).send({messagem:"erro de servidor, tente novamente"});
        }
        console.log(decoded);
        res.send(decoded);
    })
})


app.post("/validar", async function (req, res)  {
    const {email, token} = req.body;
    const user = await authService.loginService(email);

    if (!user){
        return res.status(400).send({message:"Usuario nao encontrado"});
    }

    if(token != user.token){
        return res.status(400).send({message:"token expirado"});
    }

    user.token  = "";
    await authService.updateToken(user);
    res.status(200).send(user);

})


//função gerar token local
const token = function (){
    let token = Math.random().toString(36).substring(2);
    return token;
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}`);
})