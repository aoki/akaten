const { App } = require("@slack/bolt");

require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_AUTH_TOKEN,
  appToken: process.env.SLACK_BOT_APP_TOKEN,
  socketMode: true,
  logLevel: "debug",
});

(async () => {
  app.message("knock knock", async ({ message, say }) => {
    await say(`_Who's there?_`);
  });

  app.message(/hello/i, ({ message, say }) => {
    say("Hello!");
  });

  app.message(/.+/i, ({ message, say }) => {
    console.dir(message);
    say(`:parrot_: ${message.text}`);
  });

  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
