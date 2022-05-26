const axios = require("axios");
const config = require("./config");

function datosClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${config.api_key}&units=metric&lang=es`;
  return axios(url)
    .then(function (res) {
      datos = res.data;
      return datos
    })
    .catch(function (err) {
      return err;
    });
}

module.exports = datosClima;
