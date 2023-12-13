const express =require('express')

//const path = require('path')

const productscontroller=require('../controllers/products');
const router = express.Router();



// /admin/add-products -> Get req
router.get('/add-product',productscontroller.getAddProduct);

// admin/add-product ->Post req

router.post('/add-product',productscontroller.postAddProduct);
    

module.exports = router;