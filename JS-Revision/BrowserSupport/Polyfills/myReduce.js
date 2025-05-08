Array.prototype.myReduce = function (callback, initialValue) {
  // if initial value is provided then take that as the acc or else take the first element of the provided array (this)

  // EDGE CASE HANDLING FOR IF NOT FUNCTION OR NOT AN ARRAY
  if (typeof callback !== "function")
    throw new Error(callback + "Not a function");

  if (!Array.isArray(this)) throw new Error(this + "Object is Not an array");

  let accumulator = initialValue ? initialValue : this[0];
  let currentValue = initialValue !== undefined ? 0 : 1;

  for (let i = currentValue; i < this.length; i++) {
    accumulator = callback.call(this, accumulator, this[i], i, this);
  }
  return accumulator;
};

console.log([1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0));
