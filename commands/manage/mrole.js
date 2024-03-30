const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder().setName("mrole").setDescription("add mrole"),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await interaction.deleteReply();

    const { guild } = interaction;

    const roles = await guild.roles.fetch();
    const neverClaimedRole = roles.find(role => role.name === "NeverClaimed");
    const claimedRole = roles.find(role => role.name === "Claimed");

    console.log("ROLE TO ADD:");
    console.log(neverClaimedRole?.name, claimedRole?.name);

    const members = await guild.members.fetch();

    const member = members.find(member => member.id === "279284729461604362");

    console.log("adding...");

    await member.roles.add(neverClaimedRole);
    await member.roles.remove(claimedRole);

    sendEmbed(interaction, {
      description: `Everyone received the ${neverClaimedRole} role and lost the ${claimedRole} role.`,
      ephemeral: true,
      followUp: true,
    });

    console.log("Adding roles is finished!");
    // roles.map(r => console.log(r.name));
  },
};
