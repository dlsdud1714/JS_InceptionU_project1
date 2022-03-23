const express = require('express');
const router = express.Router();
//const {commutingOptions, carloriesAdded, breakfast} =require('../data')
const{ bringListdata, calorieCal, updatedUserData, bringExerListdata}=require('../functions')

router.get('/lists',async (req,res)=>{
    //bring previous list data
    const chosen = req.query.options;
    const name = req.query.name;
    //findOneFromList(chosen, 'breakfast')
    calorieCal(chosen, name)
    
//bring updated userdata
const updatedinfo =await updatedUserData(chosen, name)
const userObj = {userData: updatedinfo}

//bring list
const optionsArray  = await bringExerListdata('gym');
const optionsObj={ commutingOptions: optionsArray};

const concatUserAndList = {...userObj,...optionsObj};
       res.render('howToGo', concatUserAndList); 

  })



module.exports=router;