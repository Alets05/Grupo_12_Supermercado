const { Router } = require("express");
const { productsApiController } = require("../controllers/api/productsApi");
const { usersApiController } = require("../controllers/api/usersApi");

// router
const router = Router();


// API products
router.get('/products', productsApiController.list);
router.get('/products/:id', productsApiController.detail);

// API Users
router.get('/users', usersApiController.list);
router.get('/users/:id', usersApiController.detail);


module.exports = router;