
function sortTable(elem, n,nume=true) {
  //stolen on https://www.w3schools.com/howto/howto_js_sort_table.asp
  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = elem.parentElement.parentElement.parentElement
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if(nume){
        if (dir == "asc") {
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)){
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      else{
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



products={
  catlist:[],
  prodlist:[],
  pricelist:[],
  place:-2,
  addProduct:function(elem){
    this.prodlist.push(elem);
    this.pricelist.push([])
  },
  addPrice:function(elem, prod){
    this.pricelist[this.prodlist.indexOf(prod)].push=elem
  },
  addCat:function(cat){
    place+=2
  }
}
place=0


// function makeArray(category){
//   for (var i = document.getElementsByTagName("table").length - 1; i >= 0; i--) {
//     if(document.getElementsByTagName("table")[i].getAttribute("category")==category){
//       console.log(category)
//       lines = document.getElementsByTagName("table")[i].children[0].children
//       for (var i = lines.length - 1; i >= 0; i--) {
//         if(products.prodlist.indexOf(lines[i].children[0]) == -1){
//           products.addProduct(lines[i].children[0].innerHTML)
//         }
//         if(lines[i].children.length > 1){
//           products.addPrice(lines[i].children[1].innerHTML,lines[i].children[0].innerHTML)
//         }
//         else{
//           products.addPrice("",lines[i].children[0].innerHTML)
//          }
//         if(lines[i].children.length > 2){
//           products.addPrice(lines[i].children[2].innerHTML,lines[i].children[0].innerHTML)
//         }
//         else{
//           products.addPrice("",lines[i].children[0].innerHTML)
//         }
//         product = lines[i].children[0]
//         price = lines[i].children[1].innerHTML
//       }
//     }
//   }
// }


// get the average of prices on the current table
function avg(){
    for (var i = active.children[0].children.length - 1; i >= 0; i--) {
      active.children[0].children[i].children[1]
    }
}

function goTo(nbr,elem){
  for (var i = document.getElementsByClassName("fullpage").length - 1; i >= 0; i--) {
    document.getElementsByClassName("fullpage")[i].classList.replace("active","inactive")
  }
  document.getElementsByClassName("fullpage")[nbr].classList.replace("inactive","active")
  active = document.getElementsByClassName("fullpage")[nbr]
  for (var i = document.getElementsByTagName("ul").length - 1; i >= 0; i--) {
    document.getElementsByTagName("ul")[i].classList.remove("currenttable")
  }
  elem.classList.add("currenttable");

}

function shothprices(tr){
  allinst=[]
  for (var i = document.getElementsByTagName("table").length - 1; i >= 0; i--) {
    where=" le "+document.getElementsByTagName("table")[i].getAttribute("day")+"/"+document.getElementsByTagName("table")[i].getAttribute("month")+" à "+document.getElementsByTagName("table")[i].getAttribute("city")
    for (var j = document.getElementsByTagName("table")[i].getElementsByTagName("tr").length - 1; j >= 0; j--) {
      if(document.getElementsByTagName("table")[i].getElementsByTagName("tr")[j].children[0].innerHTML==tr.children[0].innerHTML){
        allinst.push([where,document.getElementsByTagName("table")[i].getElementsByTagName("tr")[j].children[1].innerHTML,document.getElementsByTagName("table")[i].getElementsByTagName("tr")[j].children[2].innerHTML])
      }
    }
  }
  div = document.createElement("div")
  div.classList.add("precisePrice")
  div.innerHTML="<div class='close' onclick='closediv(this)'>close</div>"
  table = document.createElement("tbody")
  table.innerHTML='<tr><th onclick="sortTable(this,0,false)">Date, Magasin</th><th onclick="sortTable(this,1)">Prix</th><th onclick="sortTable(this,2)">Prix/(kg ou l)</th></tr>'
  for (var i = allinst.length - 1; i >= 0; i--) {
    row=document.createElement("tr")
    for(j=0; j<allinst[i].length;j++){
      row.innerHTML+="<td onclick=''>"+allinst[i][j]+"</td>"   
    }
    table.appendChild(row)
  }
  title = document.createElement("h2")
  title.innerHTML=tr.children[0].innerHTML
  div.appendChild(title)
  table2=document.createElement("table")
  table2.appendChild(table)
  table2.classList.add("table-dark")
  div.appendChild(table2)
  document.body.appendChild(div)
}

function closediv(elem){
  elem.parentElement.remove()
}

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Function is called when everything is loaded to avoid errors
window.onload= function(){
  active = document.getElementsByClassName("inactive")[0]
  document.getElementsByClassName("inactive")[0].classList.replace("inactive","active")
  list=elem = document.createElement("li")
  // listinfo=[]

  for (var i = document.getElementsByTagName("table").length - 1; i >= 0; i--) {
    elem = document.createElement("ul")
    elem.setAttribute("onclick","goTo("+i+",this)")
    elem.innerHTML = cap(document.getElementsByTagName("table")[i].getAttribute("category"))+"<br>"+document.getElementsByTagName("table")[i].getAttribute("day")+"/"+document.getElementsByTagName("table")[i].getAttribute("month")+"<br>"+cap(document.getElementsByTagName("table")[i].getAttribute("city"))
    list.appendChild(elem)
    // listinfo.push([document.getElementsByTagName("table")[i].getAttribute("category"),document.getElementsByTagName("table")[i].getAttribute("day")+"/"+document.getElementsByTagName("table")[i].getAttribute("month"),document.getElementsByTagName("table")[i].getAttribute("city"),i])
  }
  // listcat=[]
  // for (var i = listinfo.length - 1; i >= 0; i--) {
  //   if(listinfo[i][0]){

  //   }
  // }
  document.body.appendChild(list)
  goTo(0,document.getElementsByTagName("ul")[0])

}