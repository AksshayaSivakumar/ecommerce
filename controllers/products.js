const express =require('express');

const path = require('path');
const fs=require('fs');

const rootDir = require('../util/path');
const router = express.Router();

const Product=require('../models/product');



router.getAddProduct = ((req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','add-product.html'))
});


router.postAddProduct = (req, res, next)=> {
 
  const product=new Product(`${req.body.title}`);
  
  product.save();
    res.redirect('/');
};

router.getProduct=(req,res,next)=>{
  
  const products=Product.fetchAll()
 res.send(`${products}`);
 
                  
  
};

module.exports=router;
  
