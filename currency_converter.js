import https from "https";
import chalk from "chalk";
import readline, { cursorTo } from "readline";

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_KEY = "9943e89dd82a33dcc70ef0cf";
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

https.get(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    const rates = JSON.parse(data).conversion_rates;
    r1.question("enter the amount in usd to convert : ", (amount) => {
      r1.question(
        "enter the currency you want to convert in : ",
        (currency) => {
          const rate = rates[currency.toUpperCase()];
          if (rate) {
            console.log(
              `${amount} USD is approximately ${convertCurrency(
                amount,
                rate
              )} ${currency}`
            );
          } else {
            console.log("invalid currency code");
          }
          r1.close();
        }
      );
      
    });
  });
});
