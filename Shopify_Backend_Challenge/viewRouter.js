const express = require('express')
const mongo = require('mongodb')
let router = express.Router();

router.get("/", loadInventory)
router.get("/:id", getItem)
router.put("/csv", exportCSV)
router.post("/delete/:id", deleteItem)
router.post("/edit/:id", updateItem)

function exportCSV(req,res,next){
  req.app.locals.db.collection("items").find({}).toArray(function(err,result){
    if(err){
      res.status(500).send("Error reading database");
      console.log(err);
      return;
    }
    res.status(200).send(JSON.stringify(result));
    return;
  })
  
}
    

function loadInventory(req,res,next){
  let data = req.query.name;
  let query = {};
  if(req.query.name === undefined){
    query = {};
  }else{
    query = {name:new RegExp(data,"i")}
  }
  console.log(query);
  req.app.locals.db.collection("items").find(query).toArray(function(err,result){
    if(err){
      res.status(500).send("Error reading database");
      console.log(err);
      return;
    }
    res.items = result;
    res.render("pages/viewInventory",{items:result});
    return;
  })
}

function getItem(req,res,next){
  let id = req.params.id;
  try{
    id = new mongo.ObjectId(req.params.id);
  }catch{
    res.status(404).send("Invalid ID");
    return
  }

  const promise = req.app.locals.db.collection("items").findOne({_id:Object(id)});
  promise.then((result)=>{
    if(result === null){
      res.status(404).send("cannot find item");
    }else{
      let string = JSON.stringify(result)
      res.render("pages/item" , {item:result,data:string})
    }
  })
  
}

function deleteItem(req,res,next){
  let id = req.params.id;
  try{
    id = new mongo.ObjectId(req.params.id);
  }catch{
    res.status(404).send("Invalid ID");
    return
  }
  req.app.locals.db.collection("items").deleteOne({_id:Object(id)}, function(err,result){
    if (err){
      res.status(404).send("error removing to database");
      return
    }
    res.status(200).send();
  });
  
}

function updateItem(req,res,next){
  let id = req.params.id;
  let data = req.body;
  try{
    id = new mongo.ObjectId(req.params.id);
  }catch{
    res.status(404).send("Invalid ID");
    return
  }
  console.log(req.body)
  req.app.locals.db.collection("items").updateOne({_id:Object(id)},{$set:{name:data.name, cost:data.cost, numItems: data.numItems}}, function(err,result){
    if (err){
      res.status(404).send("error updating database");
      return
    };
    res.status(200).send(JSON.stringify(data));
  })
  

}


module.exports = router;