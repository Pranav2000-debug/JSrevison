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

function trackUserHandler() {
  getPosition()
    .then((posData) => {
      //   positionData = posData;
      // return setTimer();
      return posData;
    })
    .then((data) => {
      console.log(data);
    });

  console.log("Getting position...");
}

button.addEventListener("click", trackUserHandler);
