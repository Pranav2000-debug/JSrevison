const button = document.getElementById("btn1");
// -------One way using is using onclick even on the element.---------
// button.onclick = function() {
// }
// or
const buttonClickHandler = () => {
  alert("button was clicked");
};
// button.onclick = buttonClickHandler;

// -----------BETTER WAY (bcz we can add only one func using onclick to an element)-----------
// button.addEventListener('click', () => {
//     console.log('this button was clicked');
// }); // or
// button.addEventListener('click', buttonClickHandler);

// Now we can also remove an event listener by using removeEventListener(); but to use this we need to have a handler function else we can't point to the function that needs removal (see using arrow func or anonymous func)
// setTimeout(() => {
//     button.removeEventListener('click', buttonClickHandler);
// }, 2000)

// //----------Let say we have to bind--------------
// button.addEventListener('click', buttonClickHandler.bind(this)); // bind() here won't work as this returns a new fn object
// setTimeout(() => {
//     button.removeEventListener('click', buttonClickHandler.bind(this)); // another fn object
// }, 2000)

// -------So we assign the new bound fn object to a variable and then ues it----------
// const boundFn = buttonClickHandler;

// button.addEventListener('click', boundFn);  // now it points to the same fn object
// setTimeout(() => {
//     button.removeEventListener('click', boundFn);
// }, 2000)

// We can also add event listeners to multiple elements if we get a nodelist using QSA and run a forEach() and add event listeners to all

// const buttons = document.querySelectorAll('button:not(#btn1):not([type="submit"])');
// console.log(buttons);

// buttons.forEach((btn) => {
//  btn.addEventListener('click', buttonClickHandler);
// })

// setTimeout(() => {
//     buttons.forEach((btn) => {
//         btn.removeEventListener('click', buttonClickHandler);
//     })
// }, 2000);

// --------PreventDefault() behaviour of certainl elements in html-------
const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
// })

// ------------Capturing and Bubbling------------

// const div = document.querySelector("div");

// div.addEventListener("click", (e) => {
//   console.log("Clicked div");
//   console.log(e);
// });
// button.addEventListener("click", (e) => {
//   e.stopPropagation(); // stopping bubbling in nested event listeners.
//   console.log("Clicked button");
//   console.log(e);
//   // execution from inside to outside, the bubbling phase by default is registered.
// });
//  we can switch to the Capturing phase, by adding another argument to the 


// -------------- EVENT DELEGATION--------------------

const liItem = document.querySelectorAll('li');

// liItem.forEach((item) => {
//   item.addEventListener('click', (e) => {
//     e.target.classList.toggle('highlight');
//   });
// })

// Alternatively
const uList = document.querySelector('ul');

// uList.addEventListener('click', (e) => {
//   if(e.target === e.currentTarget) {
//     return;
//   }
//   console.log(e);
//   e.target.closest('li').classList.toggle('highlight');
// });

// ------- Triggering events programatically------------

uList.addEventListener('click', (e) => {
  if(e.target === e.currentTarget) {
    return;
  }
  console.log(e);
  e.target.closest('li').classList.toggle('highlight');
  form.submit() // triggering a submit action on the form from inside this event of click on an li item. 
});