const express= require('express')
const { Router } = require("express");
const productsController = require("../controllers/productsController");

const path = require('path')
const publicPath = path.resolve(__dirname, 'public');


const router = Router();
router.use(express.static(publicPath))

router.get('/carrito', productsController.carrito);
router.get('/detalles/:id', productsController.detalle);
router.get('/NuevoProducto', productsController.NuevoProducto);

module.exports = router;