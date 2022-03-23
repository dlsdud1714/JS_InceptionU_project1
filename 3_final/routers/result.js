const express = require('express');
const router = express.Router();
const {dinner, carloriesAdded, member} =require('../data')
const{ findOneFromList, calorieCal, randomchoice, resultMessage}=require('../functions')

router.get('/',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,dinner)
    .then(chosen=>randomchoice(chosen, dinner))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const resultArray = {result: resultMessage()}
         res.render('result', resultArray); 

    })
});




module.exports=router;