const { request, response } = require("express");
const path = require('path')

const productsController = {
    carrito : (req=request, res = response)=>{

        res.render(path.resolve(__dirname ,'../views/products/productCart'));
    },

    detalle : (req = request, res = response)=>{
        const id = req.params.id;
        console.log(id)
        res.render(path.resolve(__dirname ,'../views/products/productDetail'));
    }
}


module.exports = productsController;