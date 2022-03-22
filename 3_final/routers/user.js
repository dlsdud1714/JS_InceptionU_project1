const express = require('express');
const router = express.Router();
let { setCPFratio, member }= require('../data')

router.get('/login',(req,res)=>{
    res.render('login', {layout: false})
});


//User set up
router.post('/login',(req,res)=>{
member ={
     Name: req.body.name,
     Gender: req.body.gender
 };

 //Set calories goal
const genderGoalCalorie= [2000, 2500];
if(member.Gender == "female"){
    member.GoalCalorie = genderGoalCalorie[0];
}else if(member.Gender == "male"){
    member.GoalCalorie = genderGoalCalorie[1];
};
//users.push(member);
//console.log("Users: ",users);
const layout = {layout: false};
const concatInfoObj = {...layout, ...member, ...setCPFratio}

res.render('loginInfo', concatInfoObj)
});






module.exports = router;
