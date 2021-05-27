//the code in app.js covers los angeles only, what if we want 5 places
//to solve this, we will use callback functions

const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2FtaWxsZWNsb3NhIiwiYSI6ImNrcDNuaDBucTA3Z3Yyb3BjbW14ajN5NGwifQ.mQEeO3GethugM0pulxDlBg&limit=1"; //anyplace can now be search; use encodeURIComponent()
  //console.log(geocodeURL);
  request({ url, json: true }, (error, response) => {
    if (error) {
      //used shorthand in ur
      callback(
        "Something went wrong. Unable to connect to location services",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("Location not found. Enter a valid location.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
