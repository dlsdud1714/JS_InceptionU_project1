const express = require('express');
const router= express.Router();
let {breakfast, carloriesAdded, member, setCPFratio} =require('../data')

router.get('/lists',(req,res)=>{
 const breakfastArray={breakfast: breakfast}
 const concatCarAddedBreakFast = {...member,...setCPFratio,...carloriesAdded,...breakfastArray}
 console.log(concatCarAddedBreakFast)
    res.render("breakfast", concatCarAddedBreakFast);
})

module.exports=router