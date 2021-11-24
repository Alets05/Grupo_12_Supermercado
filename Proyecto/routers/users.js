const express= require('express')
const { Router } = require("express");
const userController = require("../controllers/usersController");

const path = require('path')
const publicPath = path.resolve(__dirname, 'public');

const router = Router();
router.use(express.static(publicPath))


router.get('/login', userController.login);
router.get('/register', userController.register);


module.exports = router;