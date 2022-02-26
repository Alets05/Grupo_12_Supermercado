const db = require('../database/models');
const bcryptjs = require ('bcryptjs') ; 
const { request, response } = require('express');
const path = require('path');

const validateEmailRegister  =  async (req, res, next) => {

    // console.log('gest middleware: ' + req.session.userLogged);
   
    let usuario = await db.User.findOne({where: { email : email } })
    if (usuario){
        return res.status(400).json({
        error:{
            msg : 'El email ya se encuentra registrado'
        }
    })
    }
    return true;
    next();
}

const validateEmailLogin  =  async (email) => {

    // console.log('gest middleware: ' + req.session.userLogged);
   
    let usuario = await db.User.findOne({where: { email : email } })
    if (!usuario){
        throw new Error (`login:usuario no encontrado`)
    }
    // Le paso al otro middleware, para que compare password.
    request.usuario = usuario;
}


const validatePasswordLogin  =  async (password) => {
    
    if (request.usuario != undefined ){
        
        console.log(request.usuario['password'] + ' --- ' + password);   
        // valido password  
        if (!bcryptjs.compareSync(password, request.usuario['password'])) {
            
            throw new Error (`login:password incorrecto`)   
            }
    }
}

module.exports= {validateEmailRegister, validateEmailLogin, validatePasswordLogin};