const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "close",

  button: new ButtonBuilder()
    .setCustomId("close")
    .setLabel("❌ Close")
    .setStyle(ButtonStyle.Danger),
  // .setEmoji("❌"),

  async run(interaction) {
    const { channel } = interaction;

    await sendEmbed(interaction, {
      description: "The Ticket will be closed in 5 seconds!",
    });

    setTimeout(() => {
      channel.delete();
    }, 5000);
  },
};
