const express = require('express');
const route = express.Router();

const { starbucks } = require('../data');

route.get('/list',(req,res)=>{
    res.json(starbucks);
})

module.exports = route;