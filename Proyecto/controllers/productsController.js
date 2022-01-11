const { request, response } = require("express");
const fs = require('fs');
const path = require('path')

const productsController = {

    productos: (req=request, res = response)=>{

        let productos = require('../data/products.json');
        productos = productos.filter( prod => prod.enabled == 'on');
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
        const productosSimilares = productos.filter ( prod =>  (prod.category == producto.category && prod.id != id && prod.enabled == true) );
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
        
        res.render(path.resolve(__dirname ,'../views/products/Formulario') );
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
        
            
            // return res.json(productos);
        res.render(path.resolve(__dirname ,'../views/products/Formulario'), {"guardado": true});
    },

    editar : (req = request, res = response)=>{
        const id = req.params.id;

        
        const productos = require('../data/products.json');
        const producto = productos.find( prod => prod.id == id);
        // console.log(producto);
        if (!producto){
            
        return res.redirect ( "/products/");
        }
        
        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto});
    },

    actualizar : (req = request, res = response) => {
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

            const id = req.params.id;
       
        const productos = require('../data/products.json');
        const producto = productos.find( prod => prod.id == id);

        producto.name=nombreProducto; 
        producto.description=descripcionProducto;
        producto.category=categoriaProducto;
            // detallesProducto,
        producto.price= precioProducto;
        producto.discount= descuentoProducto;
        producto.enabled=habilitadoProducto;
        producto.size=tamanoProducto;
        producto.weight= pesoProducto;
        producto.warranty=garantiaProducto;
        producto.avatar=req.file.filename;

        console.log(productos);
        fs.writeFileSync( './data/products.json',JSON.stringify(productos));

        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto});
    
       
    },
    



    carrito : (req=request, res = response)=>{
        console.log('carrito');
        res.render(path.resolve(__dirname ,'../views/products/productCart'));
    }

}


module.exports = productsController;