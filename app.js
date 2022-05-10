const { App } = require("@slack/bolt");

require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_AUTH_TOKEN,
  appToken: process.env.SLACK_BOT_APP_TOKEN,
  socketMode: true,
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
