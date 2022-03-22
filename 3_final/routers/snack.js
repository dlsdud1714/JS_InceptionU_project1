const express = require('express');
const router = express.Router();
const {lunch, carloriesAdded, snack} =require('../data')
const{ findOneFromList, randomchoice, calorieCal }=require('../functions')

router.get('/lists',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,lunch)
    .then(chosen=>randomchoice(chosen,lunch))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={snack: snack};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('snack', concatCarAdded); 

    })
})


module.exports=router;