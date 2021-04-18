'use strict';

let maxAttempts = 25;
let products = [];
let count = 0;
function Product(name, path) {
  this.name = name;
  this.path = path;

  this.timesShown = 0;
  this.timesClicked = 0;

  products.push(this);
};

new Product('bag', 'img/bag.jpg');//[0]
new Product('banana', 'img/banana.jpg');//[1]
new Product('bathroom', 'img/bathroom.jpg');//[2]
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');

new Product('pen', 'img/pen.jpg');//[0]
new Product('banapet-sweepna', 'img/pet-sweep.jpg');//[1]
new Product('scissors', 'img/scissors.jpg');//[2]
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('dog-water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');



console.log(products[3]);
console.log(products[3].name);

function genrateRandomIndex() {
  return Math.floor(Math.random() * products.length);
}




console.log(products);
// let randomIndex = genrateRandomIndex();
// document.writeln('<img src='+products[randomIndex].path +' title='+products[randomIndex].name+'>');
// randomIndex = genrateRandomIndex();
// document.writeln('<img src='+products[genrateRandomIndex].path +' title='+products[genrateRandomIndex].name+'>');
// randomIndex = genrateRandomIndex();
// document.writeln('<img src='+products[randomIndex].path +' title='+products[randomIndex].name+'>');

let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');
let firstIndex = 0;
let secondIndex = 0;
let thirdIndex = 0;

function renderThreeProducts() {

  firstIndex = genrateRandomIndex();//9 for example
  let firstPath = products[firstIndex].path; //products[9] also we need it's path , products[9].path
  firstImage.setAttribute('src', firstPath);
  products[firstIndex].timesShown++;

  secondIndex = genrateRandomIndex();

  while (secondIndex === firstIndex) {
    secondIndex = genrateRandomIndex();

  }
  let secondPath = products[secondIndex].path;
  secondImage.setAttribute('src', secondPath);
  products[secondIndex].timesShown++;

  thirdIndex = genrateRandomIndex();

  while (thirdIndex === secondIndex || thirdIndex === firstIndex) {
    thirdIndex = genrateRandomIndex();

  }
  let thirdPath = products[thirdIndex].path;
  thirdImage.setAttribute('src', thirdPath);
  products[thirdIndex].timesShown++;
}

renderThreeProducts();

firstImage.addEventListener('click', vote);
secondImage.addEventListener('click', vote);
thirdImage.addEventListener('click', vote);


function vote(event) {
  // console.log(event);
  // console.log(event.target.id);
  if (event.target.id === 'firstImage') {
    products[firstIndex].timesClicked++;
    count++;
  } else if (event.target.id === 'secondImage') {
    products[secondIndex].timesClicked++;
    count++;

  } else if (event.target.id === 'thirdImage') {
    products[thirdIndex].timesClicked++;
    count++;
  }

  // console.log(products);

  renderThreeProducts();

  if (count == maxAttempts) {

    firstImage.removeEventListener('click', vote);
    secondImage.removeEventListener('click', vote);
    thirdImage.removeEventListener('click', vote);

    let buttonDiv = document.getElementById('buttonDiv');
    let button = document.createElement("button");
    buttonDiv.appendChild(button);
    button.textContent = "View Result";
    // button.setAttribute("id",'viewResult');
    button.addEventListener("click",showList);


  }

  console.log(count);
}

function showList(event){
  let report=document.getElementById('report');
  let ul=document.createElement('ul');
  report.appendChild(ul);
  for(let i=0;i<products.length;i++){
    let li=document.createElement('li');
    ul.appendChild(li);
    li.textContent=products[i].name+" had "+products[i].timesClicked+ " votes, and was seen "+products[i].timesShown+ " times.";
  }
}
 











// function vote1(event){
//   products[firstIndex].timesClicked++;
//   renderThreeProducts();
//   console.log(products);
// }

// function vote2(event){
//   products[secondIndex].timesClicked++;
//   renderThreeProducts();
//   console.log(products);
// }

// function vote3(event){
//   products[thirdIndex].timesClicked++;
//   renderThreeProducts();
//   console.log(products);
// }