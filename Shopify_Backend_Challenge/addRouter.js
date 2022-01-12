const express = require('express')
let router = express.Router();

router.get("/", sendAddPage)
router.post("/", getItemInfo)

function sendAddPage(req,res,next){
  res.render('pages/add')
}

function getItemInfo(req,res,next){
  let data = req.body;
  let name = data['name'];
  let cost = data['cost'];
  let numItems = data['numItems'];
  req.app.locals.db.collection("items").insertOne({name:name,cost:cost,numItems:numItems},function(err,result){
    if (err){
      res.status(404).send("error adding to database")
    };
    res.status(200).send("database go poggers");
  })
}

module.exports = router;