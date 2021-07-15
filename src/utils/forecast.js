const request = require("request");

const forecast = (lat, lon, callbak) => {
  const url =
    "http://api.weatherstack.com/current?access_key=58eafdcffb57aca034ce5e0ccb53bcc2&query=" +
    lon +
    "," +
    lat;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callbak("Unable to connect to the weather services !", undefined);
    } else if (body.error) {
      callbak("Unable to find this place !", undefined);
    } else {
      callbak(undefined, {
        temp: body.current.temperature,
        desc: body.current.weather_descriptions[0],
        humidity: body.current.humidity,
        wind: body.current.wind_speed,
        icon: body.current.weather_icons[0],
      });
    }
  });
};

module.exports = forecast;
