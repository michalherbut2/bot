const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder().setName("emojis").setDescription("emojis"),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    await interaction.deleteReply();

    const roles = await interaction.guild.emojis.fetch();
    console.log("Role:");
    roles.map(r => console.log(r.name, r.id));
  },
};
