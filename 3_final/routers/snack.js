const express = require("express");
const router = express.Router();
const { updatedUserData, bringListdata } = require("../functions");

router.get("/lists", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedUserData(chosen, name, "lunch");
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringListdata("snack");
  const optionsObj = { snack: optionsArray };

  const concatUserAndList = { ...userObj, ...optionsObj };
  res.render("snack", concatUserAndList);
});

module.exports = router;
