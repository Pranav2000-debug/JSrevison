const button = document.querySelector("button");
const output = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  // simulating .catch() with try and catch block for async await.
  let timerData, posData;
  try {
    posData = await getPosition(); // first this line needs to resolve and then the next gets executed.
    timerData = await setTimer();
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
  console.log("Getting position...");
}

button.addEventListener("click", trackUserHandler);


