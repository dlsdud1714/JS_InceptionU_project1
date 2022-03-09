function gainCalories(foodName){
    carloriesAdded.carb +=foodName.carbCal;
    carloriesAdded.protein +=foodName.proteinCal;
    carloriesAdded.fat +=foodName.fatCal;
    carloriesAdded.sumCalories = (carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat);
    carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);
    
    console.log("Your recommanded carories intake are ", user.goalCalorie, "cal.");
    console.log(`Your goals of carbonate, protein, and fat ratios are ${setCPFratio}`);
    console.log("Your daily calories intake so far is");
    console.log(carloriesAdded);
};
function loseCalories(way){
    let carbMinus = way*0.7;
    let fatMinus = way*0.3;

    carloriesAdded.carb +=carbMinus;
    carloriesAdded.fat +=fatMinus;
    carloriesAdded.sumCalories = (carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat);
    carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);

    
    console.log("Your recommanded carories intake are ", user.goalCalorie, "cal.");
    console.log(`Your goals of carbonate, protein, and fat ratios are ${setCPFratio}`);

    if (carloriesAdded.carb >0 && carloriesAdded.protein >0 && carloriesAdded.fat >0){
        console.log("Your daily calorie intake so far is");
        console.log(carloriesAdded);
    }else{
        console.log("Your daily calorie intake so far is");
        console.log(carloriesAdded.carb);
        console.log(carloriesAdded.protein);
        console.log(carloriesAdded.fat);
        console.warn("Your daily consumtion is much less than intake");
    };
    console.log("You lose calories!")
};

function randomchoose(arrayName){
    let randomindex= Math.floor(Math.random()*(arrayName.length-1));
    return arrayName[randomindex];
};

module.exports={gainCalories, loseCalories, randomchoose};