Array.prototype.myFilter = function(callback) {
  let tempArray = [];
  for(let i = 0; i < this.length; i++) {
    if(callback.call(this, this[i], i , this)) {
      tempArray.push(this[i]);
    }
  }
  return tempArray;
}

// CALLBACK FUNCTION
// function testCase(i) {
//   return i === 2;
// }