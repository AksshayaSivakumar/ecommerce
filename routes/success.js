const express = require('express');
const router = express.Router();

router.use('/success',(req,res,next)=>{
    res.send("Form Successfully filled");
});

module.exports=router
