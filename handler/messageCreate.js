const { Events, ActionRowBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const detectEmbed = require("../functions/messages/detectEmbed");
const createRow = require("../functions/messages/createRow");


module.exports = async client => {
  client.on(Events.MessageCreate, async message => {
    // console.log(message?.author);
    // if (message?.author?.username === 'miszalek2') sendEmbed(message.channel, "LISTING ENQUIRY", "description @miszalek2", "/run/media/d/home/michal/Obrazy/Jura-logos/jura_banner_subtitle.png");

    if (detectEmbed(message, "enquiry", "LISTING ENQUIRY")) {
      // const endChat = require("../buttons/options/endChat").button
      // const report = require("../buttons/options/report").button
      // const middleman = client.buttons.get('middleman').button
    
      // const row = new ActionRowBuilder().addComponents([report, middleman]);
      const row = createRow("endChat", "report", "middleman")
      // const row = createRow("options")
      sendEmbed(message.channel, "OPTIONS", "Choose what you want to do next.", "/home/michal/Obrazy/Jura-logos/logo_server_crab.gif", row)
 
    }
  });
};
