const express = require('express');
const router = express.Router();
const {dinner, carloriesAdded, gymOptions} =require('../data')
const{ findOneFromList, calorieCal, totalToCPF }=require('../functions')

router.get('/lists',(req,res)=>{
    
     //update userdata
    findOneFromList(req , gymOptions)
    .then(chosen=>totalToCPF(chosen))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={dinner: dinner};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('dinner', concatCarAdded); 

    })
})


module.exports=router;