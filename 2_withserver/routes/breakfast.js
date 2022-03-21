const express = require('express');
const router = express.Router();
const {
     carloriesAdded,breakfast
}=require('../data');


router.get('/user',(req,res)=>{
    res.status(200).json(carloriesAdded);
    
});

router.get('/list', (req,res)=>{
    res.status(200).json(breakfast);
})

module.exports = router;