const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder().setName("role").setDescription("add role"),

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

    console.log("members num:", members?.size);
    console.log("adding...");
    let i = 0;
    await Promise.all(
      members.map(async member => {
        await member.roles.add(neverClaimedRole);
        await member.roles.remove(claimedRole);

        i++;
        if (i === 60) console.log("25%");
        else if (i === 120) console.log("50%");
        else if (i === 180) console.log("75%");
      })
    );

    sendEmbed(interaction, {
      description: `Everyone received the ${neverClaimedRole} role and lost the ${claimedRole} role.`,
      ephemeral: true,
      followUp: true,
    });

    console.log("Adding roles is finished!");
    // roles.map(r => console.log(r.name));
  },
};
