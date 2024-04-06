const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const addRole = require("../../functions/roles/addRole");

module.exports = {
  name: "middleman",

  button: new ButtonBuilder()
    .setCustomId("middleman")
    .setLabel("Middleman")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    await interaction.deleteReply();

    console.log("Pressed Middleman Button!");
    const { channel, guild } = interaction;

    // fetch data
    await guild.members.fetch();
    const roles = await guild.roles.fetch();
    console.log("Data fetched!");

    const middlemanRole = roles.find(role => role.name === "Middleman");

    try {
      if (!middlemanRole) throw new Error("Middleman role not found!");

      console.log("role members:", middlemanRole.members.size);

      const roleMembers = middlemanRole.members;

      roleMembers.map(a => console.log(a.displayName, a?.presence?.status));

      const channelMember = roleMembers.find(
        member => channel.permissionsFor(member).serialize().ViewChannel
      );

      if (channelMember) {
        console.log(
          `The middleman ${channelMember.tag} is already on the channel!`
        );

        throw new Error(
          `The middleman ${channelMember} is already on the channel!`
        );
      }

      const activeRoleMembers = roleMembers.filter(
        member =>
          member?.presence?.status && member?.presence?.status !== "offline"
      );

      console.log("activeRoleMembers", activeRoleMembers.size);

      const freeMembers = activeRoleMembers.filter(
        member => !member.roles.cache.find(role => role.name === "Busy")
      );

      console.log("freeMembers:", freeMembers.size);

      if (freeMembers.size < 1)
        throw new Error(
          "All Middleman are currently busy or there is none active."
        );

      const randomMember = freeMembers.random();

      console.log("adding busy role");

      addRole(channel, randomMember.id, "Busy");

      channel.permissionOverwrites.edit(randomMember.id, {
        ViewChannel: true,
      });

      console.log("random middleman:", randomMember.displayName);

      await sendEmbed(channel, {
        description: `${interaction.user} invited middleman ${randomMember} to the chat.`,
      });

      // add middleman to the thread
      const threads = await channel.threads.fetch();

      const thread = threads.threads.find(
        thread => thread.name === "ENTER CHAT"
      );

      thread.members.add(randomMember);

      console.log("\x1b[34m%s\x1b[0m", 
        `${interaction.user.tag} invited middleman ${randomMember.user.tag} to the chat.`
      );
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(channel, { description: error.message, ephemeral: true });
    }
  },
};
