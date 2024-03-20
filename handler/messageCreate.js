const { Events, ActionRowBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const detectEmbed = require("../functions/messages/detectEmbed");
const createRow = require("../functions/messages/createRow");

module.exports = async client => {
  client.on(Events.MessageCreate, async message => {
    // console.log(message);
    if (message?.author?.username === "bot_test") return;
    // console.log(message);
    if (message?.author?.username === "miszalek2" && message.content === "sd") {
      const invites = await message.guild.invites.fetch();

      // invites.map(invite => console.log(invite.uses,invite.inviterId,invite.code));
      // invites.reduce((acc, cur)=>{acc[cur.inviterId]+=})
      // message.channel.threads.create({
      //   name: "ENTER CHAT",
      // });
    }

    //sendEmbed(message.channel, {title: "LISTING ENQUIRY", description: "siema", image: "/run/media/d/home/michal/Obrazy/Jura-logos/jura_banner_subtitle.png"});
    // if (detectEmbed(message, "enquiry", "LISTING ENQUIRY")) {
    //   // const endChat = require("../buttons/options/endChat").button
    //   // const report = require("../buttons/options/report").button
    //   // const middleman = client.buttons.get('middleman').button

    //   // const row = new ActionRowBuilder().addComponents([report, middleman]);
    //   console.log("siema");
    //   const row = createRow("endChat", "report", "middleman")
    //   // const row = createRow("options")
    //   sendEmbed(message.channel, "OPTIONS", "Choose what you want to do next.", "/home/michal/Obrazy/Jura-logos/logo_server_crab.gif", row)

    // }
  });
};
