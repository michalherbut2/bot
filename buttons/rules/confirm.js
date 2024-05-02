const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "confirm",

  button: new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("CONFIRM")
    .setStyle(ButtonStyle.Secondary),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { member } = interaction;
    member.kick("They did not agree to the rules.");

    console.log(
      "\x1b[34m%s\x1b[0m",
      `${member.user.tag} LEFT the server by rules.`
    );
  },
};
