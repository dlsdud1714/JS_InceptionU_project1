const express = require('express')
const router = express.Router();
const {commutingOptions} = require('../data')

router.get('/list', (req,res)=>{
    res.json(commutingOptions);
});

module.exports=router