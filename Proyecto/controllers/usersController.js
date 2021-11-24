const { request, response } = require("express");
const path = require('path')

const userController = {

    login : (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'));
    },

    register: (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Register_prov'));
    }
}


module.exports = userController;