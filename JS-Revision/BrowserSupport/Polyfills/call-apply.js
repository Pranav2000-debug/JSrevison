const obj = {
  name: "Johh",
  city: "San Francisco",
};

function displayInfo(state) {
  console.log(`Hi I am ${this.name} from ${this.city}, ${state}`);
}

// function borrowing. using call and apply, the this keyword refers to the object that has borrowed the function as its context.
Function.prototype.myCall = function (context, ...args) {
  // console.log(context); // is my object
  // console.log(this); // is my function
  if (typeof this !== "function") throw new Error("Not a function");
  if (typeof context !== "object") throw new Error("not an object");
  context.func = this;
  context.func(...args);
  delete context.func; // delete so that the original object is not mutated.
};

displayInfo.myCall(obj, "California");

// APPLY POLYFILL
Function.prototype.myApply = function (context, argsArray) {
  context.func = this;
  context.func(...argsArray); // spread it into separate args
  delete context.func; // delete so that the original object is not mutated.
};

// BIND POLYFILL
Function.prototype.myBind = function (context, ...args) {
  context.func = this;
  return function (...rest) {
    context.func(...args, ...rest);
    delete context.func;
  };
};


