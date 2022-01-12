function submit(){
  let data = {};
  let name = getItemByID("itemName");
  let cost = getItemByID("cost");
  let numItems = getItemByID("numItems");
  if (name === "" || cost === "" || numItems === ""){
    alert("missing required field")
  }
  cost = parseInt(cost);
  numItems = parseInt(numItems)
  console.log(Number.isInteger(cost))
  console.log(Number.isInteger(numItems))
  if (!Number.isInteger(cost) || !Number.isInteger(numItems)){
    alert("cost and number of items must be integers")
    return
  }
  if (cost < 0 || numItems < 0){
    alert("Cost and number of items cannot be negative")
    return
  }

  data = {
    name:name,
    cost:cost,
    numItems:numItems
  }

  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200){
      alert("Item has been added to the Database")
      window.location = "/items"
      
    }
  }
  req.open("POST", 'http://localhost:3000/add');
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));

}

function getItemByID(id){
  value = document.getElementById(id).value;
  return value;
}