const express = require('express');
const router = express.Router();
const {gymOptions, carloriesAdded, snack} =require('../data')
const{ findOneFromList, randomchoice, calorieCal }=require('../functions')

router.get('/lists',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,snack)
    .then(chosen=>randomchoice(chosen,snack))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={gymOptions: gymOptions};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
        console.log(concatCarAdded)
         res.render('gym', concatCarAdded); 
    })
})


module.exports=router;