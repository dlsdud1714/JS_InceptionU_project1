const express = require("express");
const router = express.Router();
const {
  updatedUserData,
  bringListdata,
  bringUserdata,
} = require("../functions");

router.get("/YN", async (req, res) => {
  const chosen = req.query.options;
  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await updatedUserData(chosen, name, "starbucks");
  const userObj = { userData: updatedinfo };

  const concatCarAdded = { ...userObj };
  res.render("lunchYN", concatCarAdded);
});

router.get("/lists", async (req, res) => {

  const name = req.query.name;

  //bring updated userdata
  const updatedinfo = await bringUserdata(name);
  const userObj = { userData: updatedinfo };

  //bring list
  const optionsArray = await bringListdata("lunch");
  const optionsObj = { lunch: optionsArray };
  const concatCarAdded = { ...userObj, ...optionsObj };

  if (req.query.options === "no") {
    res.send(
      `<script>alert('You forgot to bring your lunch box and your wallet.. No choice. Find and join any group for lunch'); location.href=history.go(-1) </script>`
    );
  } else if (req.query.options === "yes") {
    res.render("lunch", concatCarAdded);
  }
});

module.exports = router;
