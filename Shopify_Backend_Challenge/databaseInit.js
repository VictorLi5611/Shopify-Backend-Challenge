let itemNames = ["watermellon", "cat", "dog", "chessboard","water", "juice", "mustard", "sword", "books", "headsets"]
let items = [];

itemNames.forEach(name =>{
  let u = {};
  u.name = name;
  u.numItems = 10;
  u.cost = 10.00;
  items.push(u);
});

let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let db;

MongoClient.connect("mongodb://localhost:27017/", function(err,client){
  if(err) throw err;
  db = client.db("store");

  db.listCollections().toArray(function (err,result){
    if(result.length == 0){
      db.collection("items").insertMany(items,function(err,result){
          if(err){
            throw err;
          };
          console.log(result.insertedCount + " items successfully added (should be 10)");
          client.close()

      });
      return;

    }

    let numDropped = 0;
    let toDrop = result.length;
    result.forEach(collection =>{
      db.collection(collection.name).drop(function (err,delOk){
        if(err){
          throw err;
        }

        console.log("Dropped Collection: " + collection.name);
        numDropped++;

        if (numDropped == toDrop){
          db.collection("items").insertMany(items,function(err,result){
            if(err){
              throw err;
            };
            console.log(result.insertedCount + " items successfully added (should be 10)");
            client.close()
          });
        }
      })
    })
  })

})