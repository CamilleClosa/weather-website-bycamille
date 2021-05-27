const request = require("request");

const forecast = (latitude, Longitude, callback) => {
  const forcastURL =
    "http://api.weatherstack.com/current?access_key=b50ff8830cfea91df3b3c62f49894ec3&query=" +
    encodeURIComponent(Longitude) +
    "," +
    encodeURIComponent(latitude);
  //console.log(forcastURL);
  request({ url: forcastURL, json: true }, (error, response) => {
    //we can destructuring in response; change it to {body}
    //if {response} is used, remove response word to your code below; ex response.body.error = body.error
    //if url: url; you can use short hand
    if (error) {
      callback(
        "Something went wrong. Unable to connect to weather services!",
        undefined
      );
    } else if (response.body.error) {
      callback("Unable to find location! Check your input", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${response.body.location.localtime}. Today is ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out. The humidity is ${response.body.current.humidity}.`
      );
    }
  });
};

module.exports = forecast;
