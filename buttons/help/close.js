const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "close",

  button: new ButtonBuilder()
    .setCustomId("close")
    .setLabel("❌ Close")
    .setStyle(ButtonStyle.Danger),
  // .setEmoji("❌"),

  async execute(interaction) {
    const { channel } = interaction;

    await sendEmbed(interaction, {
      description: "The Ticket will be closed in 5 seconds!",
      // ephemeral: true
    });

    setTimeout(() => {
      channel.delete();
      // if (member.permissions.has(PermissionsBitField.Flags.Administrator))
      //   channel.delete();
      // else {
      //   sendEmbed(channel, {
      //     description: `${user} has left the chat.`,
      //   });
      // }
    }, 5000);
  },
};
