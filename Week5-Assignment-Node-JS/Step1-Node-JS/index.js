const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require("./config.json");
const fs = require('fs');
const app = express();

// Configure the view engine to use both Pug and EJS
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Load heroes data from heroes.json
const dataPath = path.join(__dirname, 'data', 'heroes.json');
let heroes = [];

try {
  const data = fs.readFileSync(dataPath, 'utf-8');
  heroes = JSON.parse(data);
} catch (err) {
  console.error('Error reading heroes data:', err);
}


// // Render the hero form pug
// app.get('/', (req, res) => {
//   res.render('heroes', { heroes });
// });


// Handle form submission
app.post('/add', (req, res) => {
  const newHero = {
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    power: req.body.power,
    city: req.body.city,
  };

  heroes.push(newHero);

  fs.writeFile(dataPath, JSON.stringify(heroes), (err) => {
    if (err) {
      console.error('Error writing heroes data:', err);
    }
  });

  res.redirect('/');
});

// Render the heroes table using EJS
app.get('/', (req, res) => {
  res.render('heroes.ejs', { heroes });
});

app.listen(config.port,config.host,error => {
  error 
  ? console.log("Error ", error)
  : console.log(`server is now live on ${config.host} : ${config.port}`)
})

