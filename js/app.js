'use strict';


let threeIndexes = [];


let maxAttempts = 25;
let products = [];
let count = 0;

let arrayOfProducts = [];

function Product(name, path) {
  this.name = name;
  this.path = path;

  this.timesShown = 0;
  this.timesClicked = 0;

  products.push(this);
  arrayOfProducts.push(this.name);
}

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
  while (threeIndexes.includes(firstIndex)) {

    firstIndex = genrateRandomIndex();
  }

  secondIndex = genrateRandomIndex();
  while (secondIndex === firstIndex || threeIndexes.includes(secondIndex)) {

    secondIndex = genrateRandomIndex();

  }

  thirdIndex = genrateRandomIndex();
  while (thirdIndex === secondIndex || thirdIndex === firstIndex || threeIndexes.includes(thirdIndex)) {

    thirdIndex = genrateRandomIndex();

  }

  threeIndexes[0] = firstIndex;
  threeIndexes[1] = secondIndex;
  threeIndexes[2] = thirdIndex;

  console.log(threeIndexes);

  ///////////////////////////////////////////
  let firstPath = products[firstIndex].path; //products[9] also we need it's path , products[9].path
  firstImage.setAttribute('src', firstPath);
  products[firstIndex].timesShown++;

  let secondPath = products[secondIndex].path;
  secondImage.setAttribute('src', secondPath);
  products[secondIndex].timesShown++;

  let thirdPath = products[thirdIndex].path;
  thirdImage.setAttribute('src', thirdPath);
  products[thirdIndex].timesShown++;

}

renderThreeProducts();

firstImage.addEventListener('click', vote);
secondImage.addEventListener('click', vote);
thirdImage.addEventListener('click', vote);


let buttonDiv = document.getElementById('buttonDiv');
let button = document.createElement('button');





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

    buttonDiv.appendChild(button);
    button.textContent = 'View Result';
    // button.setAttribute("id",'viewResult');
    button.addEventListener('click', showList);


  }

  console.log(count);

  saveToLS();
}


let arrayOfVotes = [];
let arrayOfShown = [];


function showList(event) {
  let report = document.getElementById('report');
  let ul = document.createElement('ul');
  report.appendChild(ul);



  for (let i = 0; i < products.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = products[i].name + ' had ' + products[i].timesClicked + ' votes, and was seen ' + products[i].timesShown + ' times.';
    arrayOfVotes.push(products[i].timesClicked);
    arrayOfShown.push(products[i].timesShown);
  }
  drawChart();
  button.removeEventListener('click', showList);
}

function drawChart() {
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayOfProducts,
      datasets: [{
        label: '# of Votes',
        data: arrayOfVotes,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }, {
        label: '# of Shown',
        data: arrayOfShown,
        backgroundColor: ['rgb(164 213 220)'],
        borderColor: ['rgba(255, 199, 132, 1)'],
        borderWidth: 1
      }]

    }
  });

}

function saveToLS() {
  localStorage.setItem("products", JSON.stringify(products));

  localStorage.setItem('votes', count);

}


function getFromLS() {
  let savedCount = localStorage.getItem("votes");
  console.log(typeof savedCount);

  if (savedCount !== null) {
    count = parseInt(savedCount);
  }

  let savedProducts = localStorage.getItem('products');
  // let tempProducts = JSON.parse(savedProducts);
  if (savedProducts !== null) {
    products = JSON.parse(savedProducts);
  }

  // console.log(tempProducts);
  // products = tempProducts;


  console.log('count = ' + count);
  console.log(products);
}

getFromLS();








































