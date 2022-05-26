require("dotenv").config();
const config = {
    token_bot : process.env.BOT_TOKEN,
    api_key : process.env.API_KEY,
}
module.exports = config;