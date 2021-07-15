const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup hbs and views location
app.set("views", templatesPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "Your must provide an adresse",
    });
  }

  geocode(req.query.adress, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(lat, lon, (err, { temp, wind, desc, humidity, icon }) => {
      if (err) {
        return res.send({
          error,
        });
      }
      return res.send({
        temp,
        location,
        wind,
        desc,
        humidity,
        icon,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
