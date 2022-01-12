const express= require('express')
const { Router } = require("express");
const multer = require('multer');

const productsController = require("../controllers/productsController");

// path
const path = require('path')
const publicPath = path.resolve(__dirname, 'public');

//multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        let folder = path.join(__dirname, '../public/images/products');
        cb(null, folder);
    },
    filename : (req,file,cb)=>{
        let fileName = 'img_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({storage});


// Para recibir PUT / DELETE:
const methodOverride = require('method-override');
const { guestMiddleware } = require('../middlewares/guestMiddleware');
const { validarCampos } = require('../middlewares/validarCampos');
const { authMiddleware } = require('../middlewares/authMiddleware');

// middleware express validator


// router
const router = Router();
router.use(express.static(publicPath))
router.use(methodOverride('_method'));



// routes
router.get('/carrito' ,[authMiddleware, validarCampos] , productsController.carrito);

router.get('/create', [authMiddleware, validarCampos], productsController.crear);

router.get('/:id/edit', [authMiddleware, validarCampos] ,productsController.editar);
router.put('/:id/edit',upload.single('imagenProducto'), productsController.actualizar);

router.get('/:id', [authMiddleware, validarCampos] ,productsController.producto);

router.delete('/:id', [authMiddleware, validarCampos] , productsController.borrar);



router.get('/', [authMiddleware, validarCampos], productsController.productos);
router.post('/',upload.single('imagenProducto') ,productsController.guardar);


module.exports = router;