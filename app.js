const { App } = require("@slack/bolt");

require("dotenv").config();

const { TextLintEngine } = require("textlint");
const isPrime = require("./is-prime");

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

  // https://api.slack.com/methods/users.info
  app.message("info", async (message, say) => {
    const info = {};
    // const info = {
    //   team_id: message.team_id,
    //   user: message.envent.user,
    //   channel: message.envent.channel,
    // };
    console.log(JSON.stringify(message, null, 2));
    await say(`${JSON.stringify(info, null, 2)}`);
  });

  app.action("bot_changed", async ({ body, ack, say }) => {
    say(":wave:");
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

  app.message("restart", async ({ message, say }) => {
    await say("I restart now :wave:");
    process.exit(0);
  });

  app.message(/([1-9][0-9]{0,15})/, async ({ context, say }) => {
    console.dir(context);
    const n = context.matches[0];
    const res = isPrime(n) ? "is prime!!" : "is not prime!!";
    await say(`${n} ${res}`);
  });

  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
