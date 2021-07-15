const request = require("request");

const geocode = (adresse, callback) => {
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    adresse +
    ".json?access_token=pk.eyJ1IjoiYW1pbmUxNCIsImEiOiJja3F3eTJpaDQwcTl3MzFxaHczZXJnaDFqIn0.IH3khdQB738XOwETPtxs8w&limit=1";
  request({ url: geocodeURL, json: true }, (err, {body} = {}) => {
    if (err) {
      callback("Unable to connect to geocode services !", undefined);
    } else if (!body.features.length) {
      callback("Unable to find this place !", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        lon: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
