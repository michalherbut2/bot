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
    sendEmbed(interaction, { description: "elo", title: "s", ephemeral: true });
  },
};
