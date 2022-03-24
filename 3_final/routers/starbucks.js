const express = require("express");
const router = express.Router();
const {
  bringListdata,
  updatedExerUserData,
} = require("../functions");

router.get("/lists", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedExerUserData(chosen, name, "howToGo");
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringListdata("starbucks");
  const optionsObj = { starbucks: optionsArray };

  const concatUserAndList = { ...userObj, ...optionsObj };
  res.render("starbucks", concatUserAndList);
});

module.exports = router;
