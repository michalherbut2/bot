const { Events } = require("discord.js");
const client = require("../index");
const createRow = require("../functions/messages/createRow");
const sendEmbed = require("../functions/messages/sendEmbed");

client.on(Events.ThreadCreate, thread => {
  // console.log(thread);
  // if (thread.name !== "ENTER CHAT") return;

  // const row = createRow("endChat", "report", "middleman");
  // thread.join();
  // // const row = createRow("options")
  // sendEmbed(thread.parent, {
  //   title: "OPTIONS",
  //   description: "Choose what you want to do next.",
  //   image:
  //     "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&",
  //   row
  // });
});
