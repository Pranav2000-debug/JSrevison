/* 
  RELATED TO OBJECTS 
  API to control objects
  Standardized and grouped methods
  Control code usage and impact
  The Reflect.setPrototypeOf() static method is like Object.setPrototypeOf() but returns a Boolean. It sets the prototype (i.e., the internal [[Prototype]] property) of a specified object.

  Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. A data descriptor is a property with a value that may or may not be writable. An accessor descriptor is a property described by a getter-setter pair of functions. A descriptor must be one of these two flavors; it cannot be both.
*/

// const o = {}
// let bValue = 38;
// Object.defineProperty(o, "b", {
//   get() {
//     return bValue;
//   },
//   set(newValue) {
//     bValue = newValue;
//   },
//   enumerable: true,
//   configurable: true,
// });
// console.log(o.b)
// o.b = 12;
// console.log(o.b)


const course = {
  title: "Javascript - The complete guide",
};

// SIMILAR BEHAVIOUR
// Object.setPrototypeOf(course, {
//   toString() {
//     return this.title;
//   },
// });

// // BUT---
// Reflect.setPrototypeOf(course, {
//   toString() {
//     return this.title;
//   },
// });
// Reflect.defineProperty(course, "price", {

// });
// console.log(course.title)
// console.log(course)


const obj = {};
const a = Symbol("a");
const b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

const objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols); // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]); // Symbol(a)
console.log(obj[a])
