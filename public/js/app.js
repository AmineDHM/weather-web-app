const weatherForm = document.querySelector("form");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".icon");
icon.className = "icon hidden";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  icon.className = "icon hidden";
  city.textContent = null;
  temp.textContent = null;
  desc.textContent = null;
  humidity.textContent = null;
  wind.textContent = null;
  icon.src = null;
  city.textContent = "Loading...";
  adress = document.getElementById("adress").value;
  fetch("http://192.168.1.7:3000/weather?adress=" + adress).then((response) => {
    response.json().then((data) => {
      city.textContent = "";
      if (data.error) {
        city.textContent = data.error;
      } else {
        city.textContent = "Weather in " + data.location;
        temp.textContent = data.temp + " C°";
        desc.textContent = data.desc;
        humidity.textContent = "Humidity: " + data.humidity + " %";
        wind.textContent = "Wind speed: " + data.wind + " km/H";
        icon.src = data.icon;
        icon.className = "icon";
      }
    });
  });
});
