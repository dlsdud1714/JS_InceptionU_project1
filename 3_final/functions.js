let { carloriesAdded } = require("./data");

function findOneFromList(req, lists) {
  return new Promise((resolve) => {
    const Chosen = req.query.options;
    lists.map((list) => {
      if (list.name === Chosen) {
          console.log(list)
        resolve(list);
        
      }
    });
  });
}

function randomchoice(chosen, array) {
  if (chosen.name !== "Random") {
    return chosen;
  }
  let randomindex = Math.floor(Math.random() * (array.length - 1));
  console.log(array[randomindex]);
  return array[randomindex];
}

function calorieCal(data) {
  carloriesAdded.carb += data.carbCal;
  carloriesAdded.protein += data.proteinCal;
  carloriesAdded.fat += data.fatCal;
  carloriesAdded.sumCalories =
    carloriesAdded.carb + carloriesAdded.protein + carloriesAdded.fat;
  carloriesAdded.carbRatio = (
    carloriesAdded.carb / carloriesAdded.sumCalories
  ).toFixed(2);
  carloriesAdded.proteinRatio = (
    carloriesAdded.protein / carloriesAdded.sumCalories
  ).toFixed(2);
  carloriesAdded.fatRatio = (
    carloriesAdded.fat / carloriesAdded.sumCalories
  ).toFixed(2);
}
//only for exercise
function totalToCPF(data) {
  const totalLost = data.loseCal;
  const carbMinus = totalLost * 0.7;
  const fatMinus = totalLost * 0.3;
  const calArray = { carbCal: carbMinus, proteinCal: 0, fatCal: fatMinus };
  return calArray;
}

module.exports = { findOneFromList, calorieCal, totalToCPF, randomchoice };
