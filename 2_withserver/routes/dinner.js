const express = require('express');
const router = express.Router();

let {dinner} = require('../data');

router.get('/list',(req,res)=>{
    res.json(dinner);
});

module.exports=router