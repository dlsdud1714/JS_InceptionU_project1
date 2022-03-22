const express = require('express');
const router = express.Router();
const {commutingOptions, carloriesAdded, breakfast} =require('../data')
const{ findOneFromList, calorieCal ,randomchoice}=require('../functions')

router.get('/lists',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,breakfast)
    .then(chosen=>randomchoice(chosen, breakfast))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const optionsArray={commutingOptions: commutingOptions};
        const concatCarAdded = {...carloriesAdded,...optionsArray};
         res.render('howToGo', concatCarAdded); 

    })
})


module.exports=router;