const fs = require('fs');
const faker = require('faker');

//Info generation helpers
//Generate a array of numbers uniformly distant into 30 numbers for a given range.
const generateUniformRange = function(min, max){
  let diff = (max-min)/30;
let res = [];
for(let i = 0; i <30; i++){
  res.push(+(min+diff*i).toFixed(2));
}
return res;
}

//Generate 30 random volumes for bar graph.
const getRandomHeights = function(){
  let res= [];
  for(let i = 0; i <30; i++){
  res.push(Math.round(Math.random()*100));
}
return res;
}

//Get Average price of randomly generated data
const getAverage = function(pArr, vArr){
  let total = 0;
  for(let i = 0; i<30;i++){
      total+=pArr[i]*vArr[i];
  }
  return total/(vArr.reduce((accum,x)=>{return accum+x}));
}

const wstream = fs.createWriteStream('./volumeData2.tsv');
const fakeDataGenerator = (index) => {
  for (let i = index; i <= 10000000; i++) {
    let min = parseFloat(faker.finance.amount(0.01, 10, 2));
    let max = parseFloat(faker.finance.amount(min, min+100, 2));
    let pricesArr = generateUniformRange(min, max);
    let pricesBraced = '{' + pricesArr + '}';
    let volumeArr = getRandomHeights();
    let volumeBraced = '{' + volumeArr + '}';
    let avg = getAverage(pricesArr, volumeArr).toFixed(2);
    let curr = faker.finance.amount(min, max, 2);
    let companyName = faker.company.companyName(0);
    let companySymbol = companyName.toUpperCase();

    if (!wstream.write(`${i}\t${min}\t${max}\t${pricesBraced}\t${volumeBraced}\t${avg}\t${curr}\t${companyName}\t${companySymbol}\n`)) {
      wstream.once('drain', () => fakeDataGenerator(i + 1));
      return;
    }
  }
  // const t1 = performance.now();
  // console.log('Seeding over!');
  // console.log("Seeding took: " + (t1 - t0) + " milliseconds.");
  wstream.end();
};

// console.log('Seeding begins now!');
// const t0 = performance.now();

fakeDataGenerator(1);