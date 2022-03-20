let { carloriesAdded  } =require('./data')

function findOneFromList(req, list){
    return new Promise(resolve=>{
        let options = ['sublist0', 'sublist1', 'sublist2', 'sublist3'];
        let tagChosen = req.query.options;
        console.log(tagChosen)
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
)}

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
    const calArray = {carbCal: carbMinus, proteinCal: 0, fatCal: fatMinus}
    return calArray
}



module.exports = { findOneFromList, calorieCal, totalToCPF }