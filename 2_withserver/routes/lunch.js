const express = require('express');
const router = express.Router();

const {lunch} = require('../data');

router.get('/list', (req,res)=>{
    res.json(lunch);
})

module.exports= router