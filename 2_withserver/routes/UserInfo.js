const express = require('express');
const router = express.Router();
const { user, genderGoalCalorie, setCPFratio } = require('../data.js');

const { route } = require('./breakfast.js');

router.get('/storedUser',(req,res)=>{
    res.json(user)
});

router.get('/goalCalories',(req,res)=>{
    res.json(genderGoalCalorie)
});

router.get('/ratio',(req,res)=>{
    res.json(setCPFratio)
});


module.exports = router