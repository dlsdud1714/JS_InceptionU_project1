const express = require('express');
const router = express.Router();
const {dinner, carloriesAdded, member} =require('../data')
const{ findOneFromList, calorieCal, randomchoice}=require('../functions')

router.get('/',(req,res)=>{
    
     //update userdata
    findOneFromList(req ,dinner)
    .then(chosen=>randomchoice(chosen, dinner))
    .then(chosen=>calorieCal(chosen))
    .then(()=>{
        const resultArray = {result: compareMessage()}
         res.render('dinner', resultArray); 

    })
});

//compare result and put calculation
function compareMessage(){
   console.log(member)
    const differ = (carloriesAdded.sumCalories-member.GoalCalorie)/member.GoalCalorie

    const message={great:"Success! You are good in shape.",
        littleOver: "Well, Your daily Calories intake is little bit over. Next time, eat less...",
        littleLess: "Well, Your daily Calories intake is little bit less. Next time, eat more... ",
        muchOver: "Well... You should go on a diet",
        muchLess: "Well... You have to eat more to live!!"
        }
    if(differ<=0.2 && differ >= -0.2){
        return `Your total Calories difference is ${differ},,,${message.great}`;
    }else if(differ>0.2 && differ<= 0.4){
        return `Your total Calories difference is ${differ},,,${message.littleOver}`;
    }else if(differ>=-0.4 && differ <-0.2){
        return `Your total Calories difference is ${differ},,,${message.littleLess}`;
    }else if(differ>0.4){
        return `Your total Calories difference is ${differ},,,${message.muchOver}`;
    }else if(differ<-0.4){
        return `Your total Calories difference is ${differ},,,${message.muchLess}`;
    }

};


module.exports=router;