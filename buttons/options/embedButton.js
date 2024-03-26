const {
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "embed",
  button: new ButtonBuilder()
    .setCustomId("embed")
    .setLabel("Send embed")
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    // sendEmbed(interaction, "LISTING ENQUIRY", "description @miszalek2", "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&");
    sendEmbed(interaction, { description: "elo", title: "s", ephemeral: true });
    // replyDangerEmbed(interaction, "siema")
  },
};
