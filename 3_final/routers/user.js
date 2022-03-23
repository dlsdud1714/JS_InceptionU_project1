const express = require('express');
const router = express.Router();
let { createUserInfo} =require('../functions')

router.get('/login',(req,res)=>{
    res.render('login', {layout: false})
});


//User set up
router.post('/login',async (req,res)=>{
let member ={
     Name: req.body.name,
     Gender: req.body.gender
 };
 
 //for rendering
 //add goalcalories + CPFratio and create data in db
const newUser = await createUserInfo(member)
const layout = {layout: false};
const concatInfoObj = {...layout,...newUser}
console.log(concatInfoObj)
res.render('loginInfo', concatInfoObj)

});




module.exports = router;
