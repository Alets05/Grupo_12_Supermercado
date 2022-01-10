const express= require('express')
const { Router } = require("express");
const userController = require("../controllers/usersController");
const multer = require('multer');

const path = require('path')
const publicPath = path.resolve(__dirname, 'public');

const router = Router();
router.use(express.static(publicPath))

//multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        let folder = path.join(__dirname, '../public/images/users');
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
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
router.use(methodOverride('_method'));

const validateLogin = [
    check('email')
    .notEmpty().withMessage('Debes completar el email').bail()
    .isEmail().withMessage('Debes completar un email válido'),
    check('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 4 }).withMessage('La contraseña debe ser más larga')
    ]




router.get('/login', userController.login);
router.post('/login',  [validateLogin, validarCampos ], userController.processLogin);

router.get('/register', userController.register);
router.post('/register',upload.single('imagenPerfil'), userController.processRegister);


module.exports = router;