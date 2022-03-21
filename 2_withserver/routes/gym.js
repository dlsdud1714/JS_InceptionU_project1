const express = require("express");
const router = express.Router();

const { gymOptions } = require("../data");

router.get('/list',(req,res)=>{
    res.json(gymOptions)
})

module.exports=router;