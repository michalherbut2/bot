const { ButtonBuilder, ButtonStyle } = require("discord.js");

const description = "3D9uG8uvxgvjtvcjXJiyCS9HqCfz1Ry6fi";

module.exports = {
  name: "bitcoin",

  button: new ButtonBuilder()
    .setCustomId("bitcoin")
    .setLabel("₿ BITCOIN")
    .setStyle(ButtonStyle.Secondary),

  async run(interaction) {
    interaction.reply(description);
  },
};
