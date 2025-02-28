import readline from "readline/promises";

const apikey = "a2ce198e4513ea8b531dd2e95fc74dba";
const base_url = `https://api.openweathermap.org/data/2.5/weather`;

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getweather = async (city) => {
  const url = `${base_url}?q=${city}&appid=${apikey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const weatherdata = await response.json()

    console.log("\nweather info")
    console.log(`city : ${weatherdata.name}`)
    console.log(`thermprature : ${weatherdata.main.temp}C`)
  } catch (error) {
    console.log(error);
  }
};

const city = await r1.question(
  "please enter the city name to get its weather : "
);
await getweather(city);
r1.close();
