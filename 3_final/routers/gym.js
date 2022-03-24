const express = require("express");
const router = express.Router();

const { updatedUserData, bringExerListdata } = require("../functions");

router.get("/lists", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedUserData(chosen, name, "snack");
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringExerListdata("gym");
  const optionsObj = { gymOptions: optionsArray };

  const concatUserAndList = { ...userObj, ...optionsObj };
  res.render("gym", concatUserAndList);
});

module.exports = router;
