const { Telegraf } = require("telegraf");
const config = require("./config");
const datosClima = require("./service");

const bot = new Telegraf(config.token_bot);
bot.command("start", (ctx) => {
  Bienvenida(ctx);
});


/* escucha el texto del usuario para mostrar el clima del ciudad */
bot.on("text", (ctx) => {
  const ciudad = ctx.message.text;
  datosClima(ciudad)
    .then((datos) => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `Así se encuentra ${datos.name} actualmente: 👀
        Estado: ${datos.weather[0].description} 
        Temperatura:${datos.main.temp} C°🌡
        Temperatura máxima: ${datos.main.temp_max} C° 🔥
        Temperatura mínima: ${datos.main.temp_min} C° ❄

Otros datos que te pueden interesar 📌:
        Humedad: ${datos.main.humidity}% 💧
        Presión: ${datos.main.pressure} hPa 🗜️ 
        Viento: ${datos.wind.speed} m/s 🌬
        Visibilidad: ${datos.visibility} m 👓
        `
      );
    })
    .catch(() => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        "Lugar no encontrado, por favor revisa la escritura"
      );
    });
});

/* acciones */
bot.action("creditos", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Este bot fue creado por @WiliamsIxcoy");
});

/* funciones */
async function Bienvenida(ctx) {
  const mensaje = `¡Bienvenido al bot del clima!🚀

Escribe el nombre la ciudad que deseas consultar🔎`;
  bot.telegram.sendMessage(ctx.chat.id, mensaje, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Mi Linkedin👨‍💻",
            url: "https://www.linkedin.com/in/wiliams-ixcoy-656074229/",
          },
        ],
        [
          {
            text: "Mi GitHub👨‍💻",
            url: "https://github.com/wiliamsTI",
          },
        ],
        [
          {
            text: "Créditos🔥",
            callback_data: "creditos",
          },
        ],
      ],
    },
  });
}

bot.launch();
