
function exportCSV(){
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      data = JSON.parse(this.responseText)
      console.log(data)
      let csvString = [["ID","Item Name", "Number of Items in Stock", "Cost"]
            ,
          ...data.map(item =>[
            item._id,
            item.name,
            item.numItems,
            item.cost
          ])
        ].map(e =>e.join(",")).join("\n");
        console.log(csvString);
        document.write(csvString)
        let hiddenElement = document.createElement('a');
        hiddenElement.href = "data:text/csv;charset=utf-8" + encodeURI(csvString);
        hiddenElement.download = "inventory.csv"
        hiddenElement.click();
        
      

      
      alert("CSV Sent");
      window.location = "/items";
    }
  }
  req.open("PUT", "/items/csv");
  req.send();
}