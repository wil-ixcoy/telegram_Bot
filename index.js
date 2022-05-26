const { Telegraf } = require("telegraf");
const config = require("./config");
const datosClima = require("./service");

const bot = new Telegraf(config.token_bot);
bot.command("start", (ctx) => {
  Bienvenida(ctx);
});

bot.action("clima", (ctx) => {
  ctx.answerCbQuery();

  const menu = "Escribe el nombre la ciudad para saber el clima";
  bot.telegram.sendMessage(ctx.chat.id, menu);
});

/* escucha el texto del usuario para mostrar el clima del ciudad */
bot.on("text", (ctx) => {
  const ciudad = ctx.message.text;
  datosClima(ciudad)
    .then((datos) => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `El clima de ${ciudad} es: ${datos.main.temp} C°`
      );
    })
    .catch(() => {
      bot.telegram.sendMessage(ctx.chat.id, "Lugar no encontrado");
    });
});

/* acciones */
bot.action("creditos", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Este bot fue creado por @WiliamsIxcoy");
});
/* escuchar */
bot.hears("Salir", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Adios", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
});
/* funciones */
async function Bienvenida(ctx) {
  const mensaje = `¡Bienvenido al bot del clima!

Escribe el nombre la ciudad que deseas consultar`;
  bot.telegram.sendMessage(ctx.chat.id, mensaje, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Mi Linkedin",
            url: "https://www.linkedin.com/in/wiliams-ixcoy-656074229/",
          },
        ],
        [
          {
            text: "Mi GitHub",
            url: "https://github.com/wiliamsTI",
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
