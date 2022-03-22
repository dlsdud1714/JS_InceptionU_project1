const express = require('express');
const router = express.Router();
const {starbucks, carloriesAdded, commutingOptions} =require('../data')
const{ findOneFromList, calorieCal, totalToCPF }=require('../functions')

router.get('/lists',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,commutingOptions)
    .then(chosen=>totalToCPF(chosen))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={starbucks: starbucks};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('starbucks', concatCarAdded); 

    })
})


module.exports=router;