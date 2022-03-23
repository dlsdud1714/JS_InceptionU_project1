const { ObjectId } = require("mongodb");
let { carloriesAdded } = require("./data");
let {createUser, findUser, findFoodLists, updateUser, findExerciseLists}=require('./model/game');

let id = "";

//Set calories goal
function setCalorieGoal(member){
    const genderGoalCalorie= [2000, 2500];
    if(member.Gender == "female"){
        member.GoalCalorie = genderGoalCalorie[0];
    }else if(member.Gender == "male"){
        member.GoalCalorie = genderGoalCalorie[1];
    };
    return member

}
//put user info to mongo
async function addGoalCPFratio(member){
  const userWithGoal = await setCalorieGoal(member)
  const CPFratio = {CalRatio:0.5, ProteinRatio:0.25, FatRatio:0.25};
  const newUser = {...userWithGoal,...CPFratio}
  return newUser
};

async function createUserInfo(member){
  const newUser = await addGoalCPFratio(member)
  createUser(newUser);
  return newUser
}

async function bringUserdata(name){
  
  const Userdatadb = await findUser(`${name}`)
  const Userdata = JSON.stringify(Userdatadb);
  const userData = JSON.parse(Userdata)
  return userData
}
//----------------------------------------------------

async function bringListdata(whatfor){
    const listArraydb= await findFoodLists(whatfor);
    const Listarray = JSON.stringify(listArraydb);
    const listArray = JSON.parse(Listarray)
   return listArray
}

async function bringExerListdata(whatfor){
  const listArraydb= await findExerciseLists(whatfor);
    const Listarray = JSON.stringify(listArraydb);
    const listArray = JSON.parse(Listarray)
   return listArray
}

//=============================

async function findOneFromList(Chosen) {
  
  let previousListArray  = await bringListdata("breakfast" );

  console.log(previousListArray)
  let onelist
  //if(Chosen==="Random"){
  //  let randomindex = Math.floor(Math.random() * (previousListArray.length));
 //   onelist= previousListArray[randomindex];
 // }else{
    previousListArray.map((list)=>{
      if(Chosen===list.name){
        onelist = list
      }})
   // }
    console.log( onelist) 
    return onelist
};


async function calorieCal(Chosen, name) {
  
  let userinfoArray = await bringUserdata(name)
  let userinfoObj = userinfoArray[0]
  
  const list = await findOneFromList(Chosen);
 
  const newCarb = userinfoObj.carb+ list.carbCal;
  const newPro = userinfoObj.protein+ list.proteinCal;
  const newFat = userinfoObj.fat+ list.fatCal;
  const newSum = newCarb + newPro + newFat;
  const newCarbRatio = (newCarb/newSum).toFixed(2);
  const newProRatio = (newPro/newSum).toFixed(2);
  const newFatRatio = (newFat/newSum).toFixed(2);

//findId
const id = userinfoObj._id

//update
updateUser({_id: new ObjectId(id)},{carb: newCarb,protein: newPro,fat: newFat, sumCalories: newSum, carbRatio: newCarbRatio, proteinRatio: newProRatio, fatRatio: newFatRatio})
}

async function updatedUserData(Chosen, name, whatfor){
  await calorieCal(Chosen, name, whatfor);
  const updated = await bringUserdata(name)
  return updated
}

//only for exercise
function totalToCPF(data) {
  const totalLost = data.loseCal;
  const carbMinus = totalLost * 0.7;
  const fatMinus = totalLost * 0.3;
  const calArray = { carbCal: carbMinus, proteinCal: 0, fatCal: fatMinus };
  return calArray;
}

//compare result and put calculation
function resultMessage(){
  
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

module.exports = { findOneFromList, calorieCal, totalToCPF, resultMessage, id ,setCalorieGoal, addGoalCPFratio, createUserInfo, bringUserdata, bringListdata, updatedUserData, bringExerListdata};
