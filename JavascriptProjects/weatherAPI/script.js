const cityName = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

function sendWeatherReq(url, method) {
  return fetch(url, {
    method: method,
  });
}

async function getWeatherReport(city, apiKey) {
  let unparsedWeatherReport;
  let weatherReport;
  try {
    unparsedWeatherReport = await sendWeatherReq(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      "GET"
    );

    if (unparsedWeatherReport.ok) {
      weatherReport = await unparsedWeatherReport.json();
    } else {
      let errorData = null;
      try {
        errorData = await unparsedWeatherReport.json();
      } catch {
        console.log("unable to process/convert data");
      }
      throw new Error(`ERROR: ${unparsedWeatherReport.status}
        ERROR BODY: ${errorData.message || "unable to process data"} `);
    }
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }

  console.log(weatherReport);
  const {
    main: { temp },
    weather: [{ description }],
  } = weatherReport;
  return { temp, description };
}

function displayWeatherFn(inputCity, displayData) {
  const displayTemp = weatherInfo.querySelector("#temperature");
  const displayName = weatherInfo.querySelector("#city-name");
  const displayDescription = weatherInfo.querySelector("#description");
  errorMessage.classList.add("hidden");

  displayName.innerText = inputCity;
  displayTemp.textContent = `Temperature: ${displayData.temp}\u00B0C`;
  displayDescription.textContent = `Weather: ${displayData.description}`;
  weatherInfo.classList.remove("hidden");
}

function showError(errReport) {
    console.log(errReport.error);
    errorMessage.textContent = errReport.error;
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
}

getWeatherBtn.addEventListener("click", async () => {
  const inputCity = cityName.value.trim();
  if (!inputCity) {
    errorMessage.classList.add("hidden");
    alert("please enter a city");
    return;
  }

  const weatherData = await getWeatherReport(
    inputCity,
    "39015c35bd2ec52ee65c3c4fd578cbf8"
  );
  if (!weatherData) return;

  console.log(weatherData);

  if(weatherData.error) {
    showError(weatherData);
    return;
  }
  
  displayWeatherFn(inputCity, weatherData);
});
