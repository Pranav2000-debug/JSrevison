const arr = [1, 2, 3, [4, 5], 6, [[7, 8]]];

Array.prototype.myFlat = function(depth = 1) {
  let tempArray = [];

  function getFlattenArray(array, depth) {
    for(let i = 0; i < array.length; i++) {
      if(Array.isArray(array[i]) && depth) {
        getFlattenArray(array[i], depth - 1);   // exit logic, when depth hits zero, exit the recursion.
      } else {
        tempArray.push(array[i]);
      }
    }
  }
  getFlattenArray(this, depth);
  return tempArray;
}


const res = arr.myFlat();
console.log(res);

