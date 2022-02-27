const { request, response } = require("express");
const { validationResult } = require("express-validator");
const fs = require('fs');
const { type } = require("os");
const path = require('path')


const db = require('../database/models'); 

const productsController = {

    productos: async (req=request, res = response)=>{

        let productos = await db.Product.findAll();
        res.render( path.join( __dirname , '../views/products/products'), {productos : productos}  );
    },


    producto: async (req=request, res = response)=>{

        let id = req.params.id;
        id = parseInt(id);

        let producto = await db.Product.findOne({where: {id:id}});
        // console.log(producto.dataValues);
        const productosSimilares = await db.Product.findAll({where : { idCategory : producto.idCategory} } );

        // console.log(productosSimilares);
        res.render( path.join( __dirname , '../views/products/productDetail'), {producto : producto , productosSimilares: productosSimilares}  );
    },

    borrar: async (req=request, res = response)=>{

        const id = req.params.id;
        const idprod = parseInt(id,10);
        
        console.log('idprod' + idprod + typeof(idprod));
        try {
        await db.Product.update({
            enabled:false},
            {
            where : {id : idprod}
        });
            
        } catch (error) {
            console.log(error);                
        }
        

        res.redirect(this.productos) ;
    },

   
    
    crear : (req = request, res = response)=>{
        const id = req.params.id;
        
        res.render(path.resolve(__dirname ,'../views/products/Formulario') );
    },
    
    guardar : async (req = request, res = response)=>{
        const  {
            nombreProducto, 
            descripcionProducto,
            categoriaProducto,
            detallesProducto,
            precioProducto,
            descuentoProducto,
            habilitadoProducto,
            tamanoProducto,
            pesoProducto,
            garantiaProducto, 
            imagenProducto
            } = req.body;

    
            const errors = validationResult(req);
            if ( !errors.isEmpty() ){
                console.log(errors.mapped())
                return res.render(path.join(__dirname ,'../views/products/editFormulario'), { errors : errors.mapped(), producto : req.body
                });  
            }
    
            let habilitadoProductoBool=false;
            
            if (habilitadoProducto === 'on'){
                habilitadoProductoBool = true
            }

            
            const producto = {
            
            name:nombreProducto, 
            description:descripcionProducto,
            idCategory:parseInt(categoriaProducto),
            price: precioProducto,
            discount: descuentoProducto,
            enabled:habilitadoProductoBool,
            size:tamanoProducto,
            weight: pesoProducto,
            warranty:garantiaProducto,
            avatar:req.file.filename
            }
            console.log(producto);
        try {
            
            let productoDB = await db.Product.create ( producto );
             } catch (error) {
            
            console.log(error);
             }

            
        res.render(path.resolve(__dirname ,'../views/products/Formulario'), {"guardado": true});
    },

    editar : async (req = request, res = response)=>{
        let id = req.params.id;

        id = parseInt(id)
        
        let producto = await db.Product.findOne({where : { id : id }})
        
        if (!producto){
            
        return res.redirect ( "/products/");
        }
        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto});
    },

    actualizar : async (req = request, res = response) => {
        const  {
            nombreProducto, 
            descripcionProducto,
            categoriaProducto,
            detallesProducto,
            precioProducto,
            descuentoProducto,
            habilitadoProducto,
            tamanoProducto,
            pesoProducto,
            garantiaProducto, 
            imagenProducto
            } = req.body;


            const errors = validationResult(req);
            if ( !errors.isEmpty() ){
                console.log(errors.mapped())
                return res.render(path.join(__dirname ,'../views/products/editFormulario'), { errors : errors.mapped(),producto : req.body
                });  
            }

            const id = req.params.id;
            let idProd = parseInt(id);

            let habilitadoProductoBool=false;
            
            if (habilitadoProducto === 'on'){
                habilitadoProductoBool = true
            }
    
            const producto = {
                
                name:nombreProducto, 
                description:descripcionProducto,
                idCategory:parseInt(categoriaProducto),
                price: precioProducto,
                discount: descuentoProducto,
                enabled:habilitadoProductoBool,
                size:tamanoProducto,
                weight: pesoProducto,
                warranty:garantiaProducto,
                avatar:req.file.filename
                }
        

                try {
                    let prod = await db.Product.update(producto, {where : {id:idProd}});
                    console.log(prod);
                    
                } catch (error) {
                    console.log(error);
                }
        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto});
    
       
    },
    



    carrito : (req=request, res = response)=>{
        console.log('carrito');
        res.render(path.resolve(__dirname ,'../views/products/productCart'));
    }

}


module.exports = productsController;