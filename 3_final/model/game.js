const mongoose = require("./mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Gender: { type: String, required: true },
  GoalCalorie: { type: Number },
  CalRatio: { type: Number },
  ProteinRatio: { type: Number },
  FatRatio: { type: Number },
  carb: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  sumCalories: { type: Number, default: 0 },
  carbRatio: { type: Number, default: 0 },
  proteinRatio: { type: Number, default: 0 },
  fatRatio: { type: Number, default: 0 },
});

const foodSchema = new mongoose.Schema({
  forWhat: { type: String, required: true },
  name: { type: String, required: true },
  carbCal: { type: Number, default: 0 },
  proteinCal: { type: Number, default: 0 },
  fatCal: { type: Number, default: 0 },
});

const exerciseSchema = new mongoose.Schema({
    forWhat: { type: String, required: true },
    name: { type: String, required: true, unique: true },
  loseCal: { type: Number, default: 0 },
  comment: { type: String },
});

//user
const user = mongoose.model("userInfo", userSchema);

const createUser = async (newData) => {
  let createdUser = await user.create(newData);
  return createdUser;
};


const findUser = async (name) => {
  let findedUser = await user.find({Name: name});
  return findedUser;
};

const updateUser = async (filter, newData) => {
  let updatedUser = await user.findOneAndUpdate(filter, newData);
  return updatedUser;
};

//lists
const foodList = mongoose.model("foodLists", foodSchema);

const createFoodLists = async (newData) => {
  let createdLists = foodList.create(newData);
  return createdLists;
};


const findFoodLists = async (when) => {
  let findedLists = await foodList.find({ forWhat: when });
  return findedLists;
};

//exercise
const exerciseList = mongoose.model("excerciseLists", exerciseSchema);

const createExerciseLists = async (newData) => {
  let createdLists = exerciseList.create(newData);
  return createdLists;
};

const findExerciseLists = async (when) => {
  let findedLists = await exerciseList.find({ forwhat: `${when}` });
  return findedLists;
};


module.exports = { createUser, findUser, updateUser, createFoodLists, findFoodLists, createExerciseLists, findExerciseLists };
