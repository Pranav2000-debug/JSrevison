Array.prototype.myMap = function(callback) {
  let tempArray = [];
  for(let i = 0; i < this.length; i++) {
    tempArray.push(callback(this[i], i, this));
  }
  return tempArray;
}

// EXAMPLE 
// const arr1 = [1,2,3,4,5];
// const arr2 = arr1.map(i => i * 2);
// console.log(arr2);
// // HERE i => i * 2 is the cb function provided to the myMap function that acts as a hof
// const arr3 = new Array(1,2,3);
// console.log(arr3.__proto__ === Array.prototype);
// console.log(Array.prototype.__proto__ === Object.prototype)
// console.log(arr3)

const arr1 = [1,2,3,4,5];
const arr2 = arr1.myMap(i => i * 2);
console.log(arr2)