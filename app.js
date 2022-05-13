const { App } = require("@slack/bolt");

require("dotenv").config();

const { TextLintEngine } = require("textlint");

const options = {
  presets: ["preset-ja-technical-writing"],
  textlintrc: false,
  color: false,
};

const engine = new TextLintEngine(options);

const app = new App({
  token: process.env.SLACK_BOT_AUTH_TOKEN,
  appToken: process.env.SLACK_BOT_APP_TOKEN,
  socketMode: true,
  logLevel: "debug",
});

(async () => {
  app.message("hello", async ({ message, say }) => {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${message.user}>!!`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
            },
            action_id: "button_click",
          },
        },
      ],
    });
  });

  app.action("button_click", async ({ body, ack, say }) => {
    // アクションのリクエストを確認
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });

  // app.message(/.+/i, async ({ message, say }) => {
  //   const res = await engine.executeOnText(message.text);
  //   const output = engine.formatResults(res);
  //   say(`${output}`);
  // });

  app.message("kill", async ({ message, say }) => {
    process.exit(0);
  });

  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
