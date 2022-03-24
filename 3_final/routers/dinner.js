const express = require("express");
const router = express.Router();

const { updatedExerUserData, bringListdata } = require("../functions");

router.get("/lists", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedExerUserData(chosen, name, "gym");
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringListdata("dinner");
  const optionsObj = { dinner: optionsArray };

  const concatUserAndList = { ...userObj, ...optionsObj };
  res.render("dinner", concatUserAndList);
});

module.exports = router;
