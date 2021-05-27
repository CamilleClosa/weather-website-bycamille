//BROWSER HTTP request with fetch
//were gonna use fetch API

/*
fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});


//Goal: Fetch the Weather
//1. Set up a parse JSON response
//2. Get the parse JSON response
//-if error property, print error
//-if no error property, print loc and forecast
//3.Refresh the browser and test your work

//any query address address, copy one to your browser. for now, Boston
fetch("http://localhost:3000/weather?address=boston").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

*/
//get data in search form
const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input"); //grab the value the user typed in the input
const p1 = document.querySelector("#message1");

const p2 = document.querySelector("#message2");

//p1_error.textContent = ""; //change content of the paragraph

//add an event listener for submitting a form
//2 arguments; 1st is a string which is the name of event we are trying to listen for; 2nd is a call back function which run every single time that event occurs
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default behavior of form which is to refresh a browser that allows your server to rerendering your page

  const location = searchElement.value;

  console.log(location);
  p1.textContent = "Loading...";
  p2.textContent = "";

  //Challenge
  //Goal: Use  input value to get weather
  //migrate fetch call into the sumbit callback
  //use the search text as the address query string value
  //submit the form with a valid and invalid value test
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          p1.textContent = data.error;
        } else {
          p1.textContent = data.location;
          p2.textContent = data.forecast;
        }
      });
    }
  );
});
