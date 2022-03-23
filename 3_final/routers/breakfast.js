const express = require('express');
const router= express.Router();

const { bringUserdata, bringListdata} = require('../functions');

router.get('/lists', async (req,res)=>{
//bring User data
    const name = req.query.name;
    const userData = await bringUserdata(name);
    const userObject= {userData: userData};
    
//bring breakfastdata
    const breakfastListArray  = await bringListdata('breakfast');
    const breakfastObject={ breakfast: breakfastListArray};
    const concatCarAddedBreakFast = {...userObject,...breakfastObject};
    res.render("breakfast", {...concatCarAddedBreakFast});

  
})

module.exports=router