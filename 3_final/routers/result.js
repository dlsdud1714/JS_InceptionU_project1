const express = require("express");
const router = express.Router();

const { updatedUserData, resultMessage } = require("../functions");

router.get("/", async (req, res) => {
  //bring previous list data
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedUserData(chosen, name, "dinner");
  const userObj = { userData: updatedinfo };

  //bring resultarray
  const message = await resultMessage(name);
  const messageObj = { result: message };

  const concatUserAndList = { ...userObj, ...messageObj };
  res.render("result", concatUserAndList);
});

module.exports = router;
