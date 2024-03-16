const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "endChat",
  button: new ButtonBuilder()
    .setCustomId("endChat")
    .setLabel("End Chat")
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    interaction.reply("The chat will close in 5 seconds.");
    setTimeout(() => {
      interaction.channel.setLocked(true);
      interaction.channel
        .setArchived(true)
        .then(newThread =>
          console.log(
            `Thread is now ${newThread.archived ? "archived" : "active"}`
          )
        )
        .catch(console.error);
    }, 5000);
  },
};
