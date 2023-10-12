const fs = require("node:fs");
const title = require("./assests/title.json");
const power = require("./assests/power.json");
const city = require("./assests/city.json");
const images = require("./assests/images.json");
const data = require("./data/data.json");

const TitleIndex = Math.floor(Math.random() * title.length);
const PowerIndex = Math.floor(Math.random() * power.length);
const CityIndex = Math.floor(Math.random() * city.length);

const randomTitle = title[TitleIndex];

const newAvenger = {
  title: randomTitle,
  power: power[PowerIndex],
  city: city[CityIndex],
  relatedImg: images[randomTitle] || "images/default.jpg"
};

data.avengers.push(newAvenger);

console.log(data);

fs.writeFileSync("data/data.json", JSON.stringify(data, null, 2), "utf-8");
