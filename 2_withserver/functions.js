let { carloriesAdded, genderGoalCalorie, setCPFratio, user } =require('./data')

function setUserCPF(req){

    let name = req.query.name;
    let gender = req.query.gender;
    user.Name = name;
    user.Gender = gender;
    
    if(gender == 'female'){
        user.GoalCalorie = genderGoalCalorie[0];
    }else if(gender == 'male'){
        user.GoalCalorie = genderGoalCalorie[1];
    };
    
    user.CarbonateRatio = setCPFratio[0];
    user.ProteinRatio = setCPFratio[1];
    user.FatRatio = setCPFratio[2];
    console.log(user);
}

function findOneFromList(req, list){
    return new Promise(resolve=>{
        let options = ['sublist0', 'sublist1', 'sublist2', 'sublist3', 'sublist4'];
        let tagChosen = req.query.options;
        let chosenBf
        for(let option of options){
            if(option==tagChosen){
                const index = options.indexOf(tagChosen);
                chosenBf = list[index];
                console.log(chosenBf)
            }
        }
    resolve(chosenBf);
    }
)};

function randomchoice(chosen, array){
    if(chosen.name !== 'Random'){
        return chosen;
    }
    let randomindex= Math.floor(Math.random()*(array.length-1));
    console.log(array[randomindex])
    return array[randomindex];
}

function calorieCal(data){

    carloriesAdded.carb += data.carbCal;
    carloriesAdded.protein += data.proteinCal;
    carloriesAdded.fat += data.fatCal;
    carloriesAdded.sumCalories = carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat;
    carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
    carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);

}
//only for exercise
function totalToCPF(data){
    const totalLost= data.loseCal;
    const carbMinus = totalLost*0.7;
    const fatMinus = totalLost*0.3;
    const calArray = {carbCal: carbMinus, proteinCal: 0, fatCal: fatMinus};
    return calArray
}


module.exports = { setUserCPF, findOneFromList, calorieCal, totalToCPF, randomchoice }