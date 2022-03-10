let readline = require('readline-sync')

//daily recommanded
let gen = ["Woman", "Man"];
let genderGoalCalorie= [2000, 2500];
let setCPFratio = [0.5, 0.25, 0.25];

//Breakfast
let popTarts = {
    name: "2 pieces of Poptarts", carbCal: 148, proteinCal: 44, fatCal: 8
};
let toastEggBanana = {
    name: "Toast, egg and banana",  carbCal: 178, proteinCal: 46, fatCal: 76
};
let ramen ={
    name: "Cheese Ramen",  carbCal: 336, proteinCal: 160, fatCal: 50
};
let cereal = {
    name: "Frosted Flakes",  carbCal: 132, proteinCal: 8, fatCal: 0
};
let breakfast = [popTarts.name, toastEggBanana.name, ramen.name, cereal.name];

//brunch
let frap = {
    name: "Mocha Frappuccino", carbCal: 143, proteinCal: 53, fatCal: 35
}
let brunch = [frap.name, "Nah,I will skip it this time"];

//lunch
let pizzaPasta = {
    name:"2 slices of pepperoni pizza and carbonara", carbCal: 465, proteinCal: 217, fatCal: 510
};
let burgerCoke = {
    name:"Beyond meat burger and diet coke", carbCal: 11, proteinCal: 80, fatCal: 191
};
let riceBowl = {
    name:"Bulgogi rice bowl", carbCal: 171, proteinCal: 250, fatCal: 183
};
let pho = {
    name:"Beef Pho", carbCal: 295, proteinCal: 255, fatCal: 111
};
let lunch = [pizzaPasta.name, burgerCoke.name, riceBowl.name, pho.name];

//snack
let pretzel= {
    name:"Mouth melting Pretzel", carbCal: 382, proteinCal: 48, fatCal: 31
};
let doritos = {
    name:"Half bag of Doritos", carbCal: 71, proteinCal: 8, fatCal: 71
};
let cheeseCube = {
    name:"Five cubes of cream cheese", carbCal: 20, proteinCal: 39, fatCal: 66
};
let snack = [pretzel.name, doritos.name, cheeseCube.name,"No eating"];

//dinner
let proteinShake = {
    name:"Chocolate protein Shake", carbCal: 19, proteinCal: 115, fatCal: 26
};
let potatoSteak = {
    name:"Steak with mashed potato", carbCal: 124, proteinCal: 133, fatCal: 320
};
let codRice = {
    name:"Cod cutlet and rice", carbCal: 220, proteinCal: 113, fatCal: 281
};
let sushiRoll = {
    name:"Unagi and Samon rolls and miso soup", carbCal: 506, proteinCal: 108, fatCal: 294
};
let dinner = [proteinShake.name, potatoSteak.name, codRice.name, sushiRoll.name, "random"];

//exercise
let walk = -50;
let gym = -100;

//inialization
let carloriesAdded={carb:0, protein:0, fat:0, sumCalories:0, carbRatio:0, proteinRatio:0, fatRatio:0};


//declaration
let user = { name: "", gender: "", goalCalorie: "" };
//let food = [breakfast, brunch, lunch, snack, dinner];


//functions
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
module.exports={user, gen, genderGoalCalorie, setCPFratio};
//start
//get user info into user

// for(let i=false;i==false;){
// console.log(`Welcome to "Stay in Shape!" game`);
// user.name = readline.question("Type your name: ");
// genderIndex = readline.keyInSelect(gen, 'Choose gender (type the number)');
// if(genderIndex == 0){
//     user.gender = "Woman";
//     user.goalCalorie= 2000;
// }else if(genderIndex == 1){
//     user.gender = "Man";
//     user.goalCalorie= 2500;
// }else{
//     console.log("Type valid input...");
// };
// console.log("User name: ", user.name);
// console.log("Gender: ", user.gender);
// console.log("Your daily recommanded Carlories intake is set to ", user.goalCalorie, "cal.");
// i=readline.keyInYN('Would you like to keep going with the setting?')
// console.log(i);
// if (i==true){
//     break;
// }};

// //breakfast
// console.log(`Hello, ${user.name}.Game Start!`);
// readline.keyInPause("You woke up late!! Eat breakfast fast. ");
// breakfastindex = readline.keyInSelect(breakfast, "Choose one!");
// console.log("You chose ", breakfast[breakfastindex], ".");
// if(breakfastindex==0){
//     console.log("You decided to eat ", popTarts.name, "for breakfast.")
//     gainCalories(popTarts);
// }else if(breakfastindex==1){
//     console.log("You decided to eat ", toastEggBanana.name , "for breakfast.")
//     gainCalories(toastEggBanana);
// }else if(breakfastindex==2){
//     console.log("You decided to eat ", ramen.name, "for breakfast.")
//     gainCalories(ramen);
// }else if(breakfastindex==3){
//     console.log("You decided to eat ", cereal.name, "for breakfast.")
//     gainCalories(cereal);
// };

// //go work
// readline.keyInPause("Time to go to work! How would you like to go?? Just let you now, you don't have much of time");

// let commutingOptions= ["I will go by car", "I am already late. will just walk to work. don't care what my boss will say!"]
// goToWorkindex = readline.keyInSelect(commutingOptions,"By car vs. By walk");
// console.log("you chose",commutingOptions[goToWorkindex]);

// if(goToWorkindex==1){
//     console.log("You are walking to go to work.")
//     loseCalories(walk);
// };

// //starbucks
// readline.keyInPause("You found a Starbucks on the way. You must need coffee to keep you awake!");
// brunchindex = readline.keyInSelect(brunch, "Would you like to drink?");
// console.log("you chose",brunch[brunchindex],".");

// if(brunchindex == 0){
//     console.log("You've decided to drink frap!")
//     gainCalories(frap);
// }else{
//     console.log("You are going to sleep at work...")
// };

// //lunch
// if(!readline.keyInYN("You went to work. Finally, it's lunch time!! Your co-worker wants to buy you lunch. Would you come along?")){
//     console.log("You forgot to bring your lunch box and your wallet.. No choice. Find and join any group for lunch.");
// };
// lunchindex= readline.keyInSelect(lunch, "Choose one.");
// if(lunchindex==0){
//     console.log("You decided to eat ", pizzaPasta.name, "for lunch.");
//     gainCalories(pizzaPasta);
// }else if(lunchindex==1){
//     console.log("You decided to eat ", burgerCoke.name, "for lunch.");
//     gainCalories(burgerCoke);
// }else if(lunchindex==2){
//     console.log("You decided to eat ", riceBowl.name, "for lunch.");
//     gainCalories(riceBowl);
// }else if(lunchindex==3){
//     console.log("You decided to eat ", pho.name, "for lunch.");
//     gainCalories(pho);
// };

// //snack
// readline.keyInPause("Finally, you've finished your work.");
// readline.keyInPause("You are getting hungry. Maybe, your lunch was not enough for you! Eat something.");
// snackindex = readline.keyInSelect(snack, "Choose one.");
// if(snackindex==0){
//     console.log("You decided to eat ", pretzel.name, "for snack.");
//     gainCalories(pretzel);
// }else if(snackindex==1){
//     console.log("You decided to eat ", doritos.name, "for snack.");
//     gainCalories(doritos);
// }else if(snackindex==2){
//     console.log("You decided to eat ", cheeseCube.name, "for snack.");
//     gainCalories(cheeseCube);
// }else if(snackindex==3){
//     console.log("You decided to eat nothing."); 
// };

// //gym
// if(readline.keyInYN("Energy filled up!! Are you going gym?")){
//     for(let i=true ;i==true;){
//         readline.keyInPause("You did work out an hour.");
//         loseCalories(gym);
//         let answer=readline.keyInYN("Would you like another round?")
//         if(answer){
//             i=true;
//             loseCalories(gym);
//         }else if(!answer){
//             i=false;
//         }
//     }
// };

// //dinner
// readline.keyInPause("Go home. Your family is dying to wait for you.");
// readline.keyInPause("Have dinner with family.");
// dinnerindex = readline.keyInSelect(dinner,"Choose your dinner manu.");
// if(dinnerindex ==0){
//     console.log("You decided to eat ", proteinShake.name, "with family for dinner. lol");
//     gainCalories(proteinShake);
// }else if(dinnerindex ==1){
//     console.log("You decided to eat ", potatoSteak.name, "for dinner.");
//     gainCalories(potatoSteak);
// }else if(dinnerindex ==2){
//     console.log("You decided to eat ", codRice.name, "for dinner");
//     gainCalories(codRice);
// }else if(dinnerindex ==3){
//     console.log("You decided to eat ", sushiRoll.name, "for dinner");
//     gainCalories(sushiRoll);
// }else if(dinnerindex ==4){
//     let randomdinner=randomchoose(dinner);
//     console.log(`Eat ${randomdinner}.`);

//     if(randomdinner ==proteinShake.name){
//         console.log("Your random choice is ", proteinShake.name, "with family for dinner. lol");
//         gainCalories(proteinShake);
//     }else if(randomdinner ==potatoSteak.name){
//         console.log("You random choice is ", potatoSteak.name, "for dinner.");
//         gainCalories(potatoSteak);
//     }else if(randomdinner ==codRice.name){
//         console.log("You random choice is ", codRice.name, "for dinner");
//         gainCalories(codRice);
//     }else if(randomdinner ==sushiRoll){
//         console.log("You random choice is ", sushiRoll.name, "for dinner");
//         gainCalories(sushiRoll);
//     }
// };

// //results
// readline.keyInPause("Good job! Let's call it a day. Your results have been calculated. ");
// let difference = carloriesAdded.sumCalories-user.goalCalorie;
// if(carloriesAdded.sumCalories> user.goalCalorie){
//     console.log(`You consumed ${difference} more than recommanded today.`);
// }else if(carloriesAdded.sumCalories == user.goalCalorie){
//     console.log(`You consumed just right of the recommanded today.`);
// }if(carloriesAdded.sumCalories < user.goalCalorie){
//     console.log(`You consumed ${difference} less than recommanded today.`);
// };
