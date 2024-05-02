const { SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");


module.exports = {
  data: new SlashCommandBuilder().setName("remove_roles").setDescription("remove role"),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { guild } = interaction;

    const roles = await guild.roles.fetch();
    // const neverClaimedRole = roles.find(role => role.name === "NeverClaimed");
    // const claimedRole = roles.find(role => role.name === "Claimed");
    const joinedRole = roles.find(role => role.name === "Joined");

    console.log("ROLE TO ADD:");
    // console.log(neverClaimedRole?.name, claimedRole?.name);

    const members = await guild.members.fetch();
    await guild.roles.fetch();

    const size = members?.size

    console.log("members num:", members?.size);
    console.log("adding...");
    let i = 0;
    await Promise.all(
      members.map(async member => {
        // await member.roles.add(neverClaimedRole);
        // await member.roles.remove(claimedRole);
        try {
          
          await member.roles.add(joinedRole);
        } catch (error) {
          console.log("lipa",member.user.tag);
        }

        i++;
        if (i === parseInt(size/4)) console.log("25%");
        else if (i === parseInt(size/2)) console.log("50%");
        else if (i === parseInt(size/4*3)) console.log("75%");
      })
    );

    sendEmbed(interaction, {
      // description: `Everyone received the ${neverClaimedRole} role and lost the ${claimedRole} role.`,
      description: `added ${joinedRole}`,
      ephemeral: true,
      followUp: true,
    });

    console.log("Adding roles is finished!");
  },
};
