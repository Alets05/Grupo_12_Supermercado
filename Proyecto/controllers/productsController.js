const { request, response } = require("express");
const fs = require('fs');
const path = require('path')

const productsController = {

    productos: (req=request, res = respponse)=>{

        let productos = require('../data/products.json');
        productos = productos.filter( prod => prod.enabled == true);
        // console.log(productos);
        res.render( path.join( __dirname , '../views/products/products'), {productos : productos}  );
    },


    producto: (req=request, res = response)=>{

        const id = req.params.id;
        console.log(id);

        let productos = require('../data/products.json');
        
        for ( producto of productos ){
            if (Number(producto.id) == Number(id)){
                producto = producto;
                break;
            }
        }
        const productosSimilares = productos.filter ( prod =>  (prod.category == producto.category && prod.id != id ) );
        console.log(productosSimilares);
        res.render( path.join( __dirname , '../views/products/productDetail'), {producto : producto , productosSimilares: productosSimilares}  );
    },

    borrar: (req=request, res = response)=>{

        const id = req.params.id;

        let productos = require('../data/products.json');
        
        for ( producto of productos ){
            if (Number(producto.id) == Number(id)){
                
                producto.enabled= false;
                fs.writeFileSync( './data/products.json',JSON.stringify(productos));
                break;
            }
        }

        res.redirect(this.productos) ;
    },

   
    
    crear : (req = request, res = response)=>{
        const id = req.params.id;
        
        res.render(path.resolve(__dirname ,'../views/products/Formulario'), {"identidad": id});
    },
    
    guardar : (req = request, res = response)=>{
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


            const producto = {
            id : Date.now(),
            name:nombreProducto, 
            description:descripcionProducto,
            category:categoriaProducto,
            // detallesProducto,
            price: precioProducto,
            discount: descuentoProducto,
            enabled:habilitadoProducto,
            size:tamanoProducto,
            weight: pesoProducto,
            warranty:garantiaProducto,
            avatar:req.file.filename
            }

            console.log(producto);
            let productos=[];

            productos = require('../data/products.json');
            productos.push(producto);
            // console.log(productos);
            fs.writeFileSync( './data/products.json',JSON.stringify(productos));
        
            
            return res.json(productos);
        // res.render(path.resolve(__dirname ,'../views/products/Formulario'), {"guardado": true});
    },



    carrito : (req=request, res = response)=>{

        res.render(path.resolve(__dirname ,'../views/products/productCart'));
    }

}


module.exports = productsController;