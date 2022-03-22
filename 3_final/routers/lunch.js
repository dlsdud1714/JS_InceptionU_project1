const express = require('express');
const router = express.Router();
const {starbucks, carloriesAdded, lunch} =require('../data')
const{ findOneFromList, calorieCal, randomchoice}=require('../functions')

router.get('/YN',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,starbucks)
    .then(chosen=>randomchoice(chosen, starbucks))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={lunch: lunch};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('lunchYN', concatCarAdded); 

    })
});

router.get('/lists',(req,res)=>{
    if(req.query.options==='no'){
        res.render('lunchNo', {layout: false});

    }else if(req.query.options==="yes"){
        const optionsArray={lunch: lunch};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('lunch', concatCarAdded); 

    }
});


module.exports=router;