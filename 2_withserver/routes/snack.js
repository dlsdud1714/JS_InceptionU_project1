const express= require('express');
const router = express();

const { snack } = require('../data');

router.get('/list',(req,res)=>{
    res.json(snack)
})

module.exports=router;