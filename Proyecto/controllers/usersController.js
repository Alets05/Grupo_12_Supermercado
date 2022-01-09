const { request, response } = require("express");
const path = require('path')
const bcryptjs = require ('bcryptjs') 
const fs = require ('fs')


const userController = {

    login : (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'));
    },

    
    
    register: (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Register_prov'));
    },


    processRegister : (req=request, res= response)=> {
        const  {
            nombreApe, 
            nombreUsuario,
            fechaNac,
            Adress,
            email,
            password,
            passwordConfirm,
            imagenPerfil,
        } = req.body;
        
        try {
            
        
        // valido password
        if (password !== passwordConfirm ){
            return res.status(400).json({
                error:{
                    msg : 'Confirmacion de password incorrecta.'
                }
            })
        }
    
        // Valido que no exista email registrado
        let usuarios = require('../data/users.json');
        let existUser = usuarios.find ( user => user.email === email);
        if (existUser){
            return res.status(400).json({
                error:{
                    msg : 'El email ya se encuentra registrado'
                }
            })
        }

        // encripto password
        let passwordHash = bcryptjs.hashSync (password, 10);

        const user = {
            nombreApe, 
            nombreUsuario,
            fechaNac,
            Adress,
            email,
            password : passwordHash,
            avatar : req.file.filename
        }


        // Guardo nuevo usuario 
        usuarios.push (user);
        console.log(JSON.stringify(usuarios));
        fs.writeFileSync('./data/users.json', JSON.stringify(usuarios));
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'));

    } catch (error) {
            console.log('No se pudo registrar el usuario')
    }

    },



}


module.exports = userController;