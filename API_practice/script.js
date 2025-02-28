let input = document.getElementById("City-Input");
let button = document.getElementById("Search-Button");
let cityName = document.getElementById("city-name");
let time = document.getElementById("time");
let temp = document.getElementById("temp");

async function getData(CityName) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=6e43d9a4fea046edb55234045251602&q=${CityName}&aqi=yes`
  );

  return await data.json();
}

button.addEventListener("click", async function () {
  let CityName = input.value;
  const result = await getData(CityName);
  cityName.innerText = `${result.location.name} , ${result.location.region} - ${result.location.country}`;
  time.innerText = `${result.location.localtime}`
  temp.innerText = `${result.current.temp_c}`
//   console.log(result);
  
});
