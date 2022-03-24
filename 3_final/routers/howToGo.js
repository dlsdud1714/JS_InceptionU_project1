const express = require("express");
const router = express.Router();
const { updatedUserData, bringExerListdata } = require("../functions");

router.get("/lists", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedUserData(chosen, name, "breakfast");
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringExerListdata("howToGo");
  const optionsObj = { commutingOptions: optionsArray };

  const concatUserAndList = { ...userObj, ...optionsObj };
  res.render("howToGo", concatUserAndList);
});

module.exports = router;
