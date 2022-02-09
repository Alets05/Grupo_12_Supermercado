const { request, response } = require("express");
const path = require('path');
const bcryptjs = require ('bcryptjs') ;
const cookie = require('cookie-parser');
const fs = require ('fs');

const db = require('../database/models'); 

const userController = {

    
    login : (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'));
    },

    processLogin : async (req=request, res= response) => {

        const {
            email,
            password,
            recordarUsuario
        } = req.body;
        
        console.log('Process Login: ' + email + '  '  + password + '  ' +recordarUsuario);
        // Consulto si usuario existe.
        let user = await db.User.findOne({where: { email : email } })
        
        if (!user) {
              return res.render(path.join(__dirname ,'../views/users/Login_prov'), { data :
                 {
                status: 400, 
                error : {
                campo : 'email',
                msg: 'usuario no se encuentra en la base de datos'
                }
            }
        });

        }
        
        // valido password  
        if (!bcryptjs.compareSync(password, user.password)) {
            
           return res.render(path.join(__dirname ,'../views/users/Login_prov'), { data :
            {
           status: 400, 
           error : {
           campo : 'password',
           msg: 'password Incorrecto'
                    }
                }
            });
    }


        let userSession = {};
        Object.assign(userSession, user);
        userSession.password= ''
        req.session.userLogged = userSession;
        
        if (recordarUsuario) {
            console.log('Guardo cookie');
            res.cookie('userEmail', email, {maxAge : (1000 * 60 ) * 2 }); // guardo por 2 minutos
        }
        
        
        res.redirect('/');
        
    },


    logout : (req=request, res= response) => {

        req.session.destroy();
        res.clearCookie('userEmail');
        console.log('logout: ' + req.session);
        res.redirect ( "/");
    },


    
    
    register: (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Register_prov'));
    },


    processRegister : async (req=request, res= response)=> {
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
        // let usuarios = require('../data/users.json');
        // let existUser = usuarios.find ( user => user.email === email);
        // if (existUser){

        let usuario = await db.User.findOne({where: { email : email } })
        if (usuario){
            return res.status(400).json({
            error:{
                msg : 'El email ya se encuentra registrado'
            }
        })
        }

        // encripto password
        const salt = bcryptjs.genSaltSync(10);
        const passwordHash = bcryptjs.hashSync (password, salt);

        const user = {
            nombreApe, 
            nombreUsuario,
            fechaNac,
            Adress,
            email,
            password : passwordHash,
            avatar : req.file.filename,
            passwordtest : password,
        }


        // Guardo nuevo usuario 
        // usuarios.push (user);
        // console.log(JSON.stringify(usuarios));
        // fs.writeFileSync('./data/users.json', JSON.stringify(usuarios));
         
        console.log('aqui');
        await db.User.create({
            firstName: user.nombreUsuario,
            lastName: user.nombreApe,
            email : user.email,
            password : user.password,
            avatar : user.avatar,
            fechaNac : user.fechaNac,
            createdAt: "2019-12-01T03:55:41.000Z",
            updatedAt: "2019-12-01T03:55:41.000Z",
        });
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'));

    } catch (error) {
            console.log('No se pudo registrar el usuario')
    }

    },



}


module.exports = userController;