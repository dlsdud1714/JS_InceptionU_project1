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
    const optionsArray={lunch: lunch};
    const concatCarAdded = {...carloriesAdded,...optionsArray};

    if(req.query.options==='no'){
        res.send("<script>alert('You forgot to bring your lunch box and your wallet.. No choice. Find and join any group for lunch'); location.href = '/lunch/lists?options=yes'</script>") 
    }else if(req.query.options==="yes"){
         res.render('lunch', concatCarAdded); 
    }
});


module.exports=router;