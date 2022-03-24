const { ObjectId } = require("mongodb");

let {
  createUser,
  findUser,
  findFoodLists,
  updateUser,
  findExerciseLists,
} = require("./model/game");

//===============User==================
//Set calories goal
function setCalorieGoal(member) {
  const genderGoalCalorie = [2000, 2500];
  if (member.Gender == "female") {
    member.GoalCalorie = genderGoalCalorie[0];
  } else if (member.Gender == "male") {
    member.GoalCalorie = genderGoalCalorie[1];
  }
  return member;
}
//put user info to mongo
async function addGoalCPFratio(member) {
  const userWithGoal = await setCalorieGoal(member);
  const CPFratio = { CalRatio: 0.5, ProteinRatio: 0.25, FatRatio: 0.25 };
  const newUser = { ...userWithGoal, ...CPFratio };
  return newUser;
}

async function createUserInfo(member) {
  const newUser = await addGoalCPFratio(member);
  createUser(newUser);
  return newUser;
}
//--------bring data from mongodb=======================
async function bringUserdata(name) {
  const Userdatadb = await findUser(`${name}`);
  const Userdata = JSON.stringify(Userdatadb);
  const userData = JSON.parse(Userdata);
  return userData;
}


async function bringListdata(whatfor) {
  const listArraydb = await findFoodLists(whatfor);
  const Listarray = JSON.stringify(listArraydb);
  const listArray = JSON.parse(Listarray);
  return listArray;
}

async function bringExerListdata(whatfor) {
  const listArraydb = await findExerciseLists(whatfor);
  const Listarray = JSON.stringify(listArraydb);
  const listArray = JSON.parse(Listarray);
  return listArray;
}
//=========================receive the list of lists for request==========
//food
async function findOneFromList(Chosen, forwhat) {
  let previousListArray = await bringListdata(forwhat);
  let onelist;

  if (Chosen === "Random") {
    let randomindex = Math.floor(Math.random() * previousListArray.length);
    onelist = previousListArray[randomindex];
  } else {
    previousListArray.map((list) => {
      if (Chosen === list.name) {
        onelist = list;
      }
    });
  }
  return onelist;
}


//--------------------exercise-----------
async function findExerOneFromList(Chosen, whatfor) {
  let previousListArray = await bringExerListdata(whatfor);
  let onelist;

  previousListArray.map((list) => {
    if (Chosen === list.name) {
      onelist = list;
    }
  });

  return onelist;
}

//=============================calculation and update to mongodb=============
//calculation calories and update
//for food
async function calorieCal(Chosen, name, forwhat) {
  let userinfoArray = await bringUserdata(name);
  let userinfoObj = userinfoArray[0];

  let list = await findOneFromList(Chosen, forwhat);

  const newCarb = userinfoObj.carb + list.carbCal;
  const newPro = userinfoObj.protein + list.proteinCal;
  const newFat = userinfoObj.fat + list.fatCal;
  const newSum = newCarb + newPro + newFat;
  const newCarbRatio = (newCarb / newSum).toFixed(2);
  const newProRatio = (newPro / newSum).toFixed(2);
  const newFatRatio = (newFat / newSum).toFixed(2);

  //findId
  const id = userinfoObj._id;

  //update
  await updateUser(
    { _id: new ObjectId(id) },
    {
      carb: newCarb,
      protein: newPro,
      fat: newFat,
      sumCalories: newSum,
      carbRatio: newCarbRatio,
      proteinRatio: newProRatio,
      fatRatio: newFatRatio,
    }
  );
}

//for exercise
async function calorieCalEx(Chosen, name, whatfor) {
  let userinfoArray = await bringUserdata(name);
  let userinfoObj = userinfoArray[0];

  let list = await findExerOneFromList(Chosen, whatfor);
  const newCarb = userinfoObj.carb + list.loseCal * 0.7;
  const newPro = userinfoObj.protein + list.loseCal * 0;
  const newFat = userinfoObj.fat + list.loseCal * 0.3;
  const newSum = newCarb + newPro + newFat;
  const newCarbRatio = (newCarb / newSum).toFixed(2);
  const newProRatio = (newPro / newSum).toFixed(2);
  const newFatRatio = (newFat / newSum).toFixed(2);

  //findId
  const id = userinfoObj._id;

  //update
  await updateUser(
    { _id: new ObjectId(id) },
    {
      carb: newCarb,
      protein: newPro,
      fat: newFat,
      sumCalories: newSum,
      carbRatio: newCarbRatio,
      proteinRatio: newProRatio,
      fatRatio: newFatRatio,
    }
  );
}

//===============bring updated data for dashboard============
//for food
async function updatedUserData(Chosen, name, whatfor) {
  await calorieCal(Chosen, name, whatfor);
  const updated = await bringUserdata(name);
  console.log("bringuser", updated);
  return updated;
}
//for exercise
async function updatedExerUserData(Chosen, name, whatfor) {
  await calorieCalEx(Chosen, name, whatfor);
  const updated = await bringUserdata(name);
  return updated;
}


//-------------result-----------------
//compare result and put calculation
async function resultMessage(name) {
  let userinfoArray = await bringUserdata(name);
  let userinfoObj = userinfoArray[0];

  const differ = (
    ((userinfoObj.sumCalories - userinfoObj.GoalCalorie) /
      userinfoObj.GoalCalorie) *
    100
  ).toFixed(2);

  const message = {
    great: "Success! You are good in shape.",
    littleOver:
      "Well, Your daily Calories intake is little bit over. Next time, eat less...",
    littleLess:
      "Well, Your daily Calories intake is little bit less. Next time, eat more... ",
    muchOver: "Well... You should go on a diet",
    muchLess: "Well... You have to eat more to live!!",
  };
  console.log("differ", differ);
  if (differ <= 0.2 && differ >= -0.2) {
    return `Your total Calories difference is ${differ}%...${message.great}`;
  } else if (differ > 0.2 && differ <= 0.4) {
    return `Your total Calories difference is ${differ}%...${message.littleOver}`;
  } else if (differ >= -0.4 && differ < -0.2) {
    return `Your total Calories difference is ${differ}%...${message.littleLess}`;
  } else if (differ > 0.4) {
    return `Your total Calories difference is ${differ}%...${message.muchOver}`;
  } else if (differ < -0.4) {
    return `Your total Calories difference is ${differ}%...${message.muchLess}`;
  }
}

module.exports = {
  findOneFromList,
  calorieCal,
  resultMessage,
  setCalorieGoal,
  addGoalCPFratio,
  createUserInfo,
  bringUserdata,
  bringListdata,
  updatedUserData,
  bringExerListdata,
  calorieCalEx,
  updatedExerUserData,
};
