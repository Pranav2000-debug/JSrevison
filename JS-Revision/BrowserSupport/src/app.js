

const button = document.querySelector("button");
const textParagraph = document.querySelector("p");

button.addEventListener("click", () => {
  console.log("clicked");
  // do something...
  const promise = new Promise();
  console.log(promise) // dummy promise to test our corejs and babel for polyfilling features
  // THIS HERE MIGHT NOT WORK FOR BROWSERS THAT DO NO SUPPORT IT.
  const text = textParagraph.textContent;
  // navigator.clipboard
  //   .writeText(text)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err))

  // WE CAN USE AN IF BLOCK TO HANDLE UNSUPPORTED CASES
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    // NOW WE CAN PROVIDE A FALLBACK CODE
    alert("feature not available");
  }
});
