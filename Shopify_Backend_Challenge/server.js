const express = require('express');
const app = express();
const port = 3000;
const mc = require("mongodb").MongoClient;

app.set("view engine", "pug");
//app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());

let addRouter = require("./addRouter");
let itemRouter = require("./viewRouter");


app.use("/add", addRouter);
app.use("/items", itemRouter);


app.get('/', function(req,res){
  res.render('pages/home')
})

mc.connect("mongodb://localhost:27017", function(err,client){
  if(err){
    console.log("Error in connecting to Database");
    console.log(err);
    return;
  }
  app.locals.db = client.db("store");
  app.listen(3000);
  console.log("Server listening on http://localhost:3000/")
})



