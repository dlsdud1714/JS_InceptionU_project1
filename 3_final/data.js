
const {createUser, findUser, updateUser, createFoodLists, findFoodLists, createExerciseLists, findExerciseLists}=require('./model/game.js')
//let users = [];
let member= { Name: "", Gender: "", GoalCalorie: "" };
let carloriesAdded={carb:0, protein:0, fat:0, sumCalories:0, carbRatio:0, proteinRatio:0, fatRatio:0};
//daily recommanded
//const setCPFratio = {CalRatio:0.5, ProteinRatio:0.25, FatRatio:0.25};

//Breakfast
function food(name, carbCal, proteinCal, fatCal){
        this.name = name;
        this.carbCal = carbCal;
        this.proteinCal = proteinCal;
        this.fatCal = fatCal;
        
};
const random = new food("Random");
const popTarts = new food("2 pieces of Poptarts", 148, 44, 8);
const toastEggBanana = new food("Toast, egg and banana", 178, 46, 76);
const ramen =new food("Cheese Ramen",336, 160, 50);
const cereal = new food("Frosted Flakes", 132, 8, 0);
let breakfast = [popTarts, toastEggBanana, ramen, cereal, random];


//exercise
function exercise(name, loseCal, comment){
        this.name = name;
        this.loseCal = loseCal;
        this.comment = comment;
}

const car = new exercise('Going by car', 0, "I am late.. I don't want to get in trouble.");
const walk = new exercise('Walking to work ', -50, "I am already late. I don't care what my boss will say!");
const commutingOptions = [car, walk];


//starbucks
const frap = new food("Mocha Frappuccino", 143, 53, 35);
const noDrick = new food("Skip Starbucks", 0,0,0);
const starbucks = [frap, noDrick, random];



//lunch
const pizzaPasta = new food("2 slices of pepperoni pizza and carbonara", 465, 217, 510);
const burgerCoke = new food("Beyond meat burger and diet coke", 11, 80, 191);
const riceBowl = new food("Bulgogi rice bowl", 171, 250, 183);
const pho = new food("Beef Pho", 295, 255, 111);
const lunch = [pizzaPasta, burgerCoke, riceBowl, pho, random];

//snack
const pretzel= new food("Mouth watering Pretzel", 382, 48, 31);
const doritos = new food("Half bag of Doritos", 71, 8, 71);
const cheeseCube = new food("Five cubes of laughing cow cheese", 20, 39, 66);
const noEat = new food("Not eating", 0,0,0);
const snack = [pretzel, doritos, cheeseCube,noEat, random];

//gym
const goGym = new exercise('Going to gym', -80, "I will work out for an hour");
const noGym = new exercise('Going home', 0, "I am tired! I am going home");
const gymOptions = [goGym, noGym];

//dinner
const proteinShake = new food("Chocolate protein Shake", 19, 115, 26);
const potatoSteak = new food("Steak with mashed potato", 124, 133, 320);
const codRice = new food("Cod cutlet and rice", 220, 113, 281);
const sushiRoll = new food("Unagi and Samon rolls and miso soup", 506, 108, 294);

const dinner = [proteinShake, potatoSteak, codRice, sushiRoll, random];

// //to updata data to database
// commutingOptions.map(list=>{
//         list = {...{forWhat: "howToGo"},...list};
        
//         createExerciseLists(list)
// })
module.exports={ member, carloriesAdded, breakfast, commutingOptions, starbucks, lunch, snack, gymOptions, dinner};

