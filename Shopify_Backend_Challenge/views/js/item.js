
function removeItem(){
  id = document.getElementById("id").innerHTML;
  console.log(id)

  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      alert("Item Removed");
      window.location = "/items";
    }
  }
  req.open("POST", "/items/delete/" + id);
  req.setRequestHeader("Content-Type", "text/plain")
  req.send(id);
}

function edit(){
  id = document.getElementById("id").innerHTML;
  console.log(id)

  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      alert("item has been updated in the Database")
      // let data = this.responseText
      // console.log(data);
      // loadPage(data);
      location.href = "/items"
    }
  }
  req.open("GET", "/items/edit/" + id);
  //req.setRequestHeader("Content-Type", "text/plain")
  req.send();
}

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
  id = document.getElementById("id").innerHTML;
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200){
      alert("Item has been updated")
      console.log(this.responseText)
      location.href = "/items"
      
    }
  }
  req.open("POST", 'http://localhost:3000/items/edit/' + id);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));

}

function getItemByID(id){
  value = document.getElementById(id).value;
  return value;
}


function init(){
  data = document.getElementById("data").innerHTML;
  console.log(data);
  document.getElementById("data").innerHTML = "";
  data = JSON.parse(data);
  console.log(data)
  loadPage(data);
}

function loadPage(data){
  document.getElementById("itemName").value = data.name;
  document.getElementById("numItems").value = data.numItems;
  document.getElementById("cost").value = data.cost;
}

