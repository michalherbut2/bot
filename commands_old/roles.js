const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("roles"),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    await interaction.deleteReply();


    const roles = await interaction.guild.roles.fetch();
    console.log("Role:");
    roles.map(r => console.log(r.name));
  },
};
