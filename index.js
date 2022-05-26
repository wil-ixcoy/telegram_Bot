const { Telegraf } = require("telegraf");
const config = require("./config");
const datosClima = require("./service");

const bot = new Telegraf(config.token_bot);
bot.command("start", (ctx) => {
  Bienvenida(ctx);
});

/* acciones */
bot.action("creditos", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Este bot fue creado por @WiliamsIxcoy");
});

bot.action("clima", (ctx) => {
  ctx.answerCbQuery();

  const menu = "Escribe el nombre la ciudad que deseas saber el clima";
  bot.telegram.sendMessage(ctx.chat.id, menu);
});

/* escuchar */
bot.hears("Salir", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Adios", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
});
bot.on("text", (ctx) => {
  const ciudad = ctx.message.text;
  datosClima(ciudad)
    .then((datos) => {
      bot.telegram.sendMessage(ctx.chat.id, datos.weather[0].description);
    })
    .catch(() => {
      bot.telegram.sendMessage(ctx.chat.id, "Lugar no encontrado");
    });
});
/* funciones */
async function Bienvenida(ctx) {
  const mensaje = "Bienvenido a este bot";
  bot.telegram.sendMessage(ctx.chat.id, mensaje, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "¡Quiero saber el clima de una ciudad del mundo!",
            callback_data: "clima",
          },
        ],
        [
          {
            text: "Linkedin",
            url: "https://www.google.com",
          },
        ],
        [
          {
            text: "GitHub",
            url: "https://www.google.com",
          },
        ],
        [
          {
            text: "Créditos",
            callback_data: "creditos",
          },
        ],
      ],
    },
  });
}

bot.launch();
