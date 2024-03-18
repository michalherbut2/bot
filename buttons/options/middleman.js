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
    console.log("Pressed Middleman Button!");
    const { channel, guild } = interaction;
    const middlemanRole = guild.roles.cache.find(
      role => role.name === "Middleman"
    );
    try {
    console.log("1");

      if (!middlemanRole) throw new Error("Middleman role not found!");
    console.log("2");

      guild.roles.cache.get(middlemanRole.id).members.map(m => console.log(m.user.tag));
    console.log("3");
      
      // const membersWithRole2 = guild.roles.cache.get(roleID).members;
      middlemanRole.members.forEach(member=>console.log(member))
      // let threadMembers;
      // if (channel.isThread()) threadMembers = await channel.members.fetch();
      console.log("4");

      const members = await guild.members.fetch();
      const membersWithRole = guild.members.cache.filter(member =>
        member.roles.cache.has(middlemanRole.id)
      );
      console.log(membersWithRole);
      if (
        membersWithRole.some(
          member => channel.permissionsFor(member).serialize().ViewChannel
        )
      )
        throw new Error("The middleman is already on the channel!");
      console.log("siema2");

      const activeMembersWithRole = membersWithRole.filter(
        member => member.presence
      );

      activeMembersWithRole.forEach(a => console.log(a.user.username));

      // const newMembers = activeMembersWithRole.filter(
      //   member =>
      //     // channel.isThread()
      //     // ? !threadMembers.find(m => m.id === member.id)
      //     // :
      //     !channel.permissionsFor(member).serialize().ViewChannel
      // );

      const freeMembers = activeMembersWithRole.filter(
        member => !member.roles.cache.find(role => role.name === "Busy")
      );

      if (freeMembers.size < 1)
        throw new Error("There are no active users with the middleman role!");

      const randomMember = freeMembers.random();

      // if (channel.isThread()) channel.members.add(randomMember);
      // else
      console.log("elo");
      addRole(interaction, randomMember.user.id, "Busy");

      channel.permissionOverwrites.edit(randomMember.user.id, {
        ViewChannel: true,
      });

      // interaction.reply(
      //   "One of the active middleman has been invited to the chat: " +
      //     randomMember.user.username
      // );
      console.log("4",randomMember.displayName);
      
      // sendEmbed(interaction, { description: "siema" })
      // await sendEmbed(interaction, {
      //   description: `<@${interaction.user.id}> has invited one of the active middleman <@${randomMember.user.id}> to the chat.`,
      // });
      console.log("5");

    } catch (error) {
      console.log("6");

      console.error(error);
      sendEmbed(interaction, { description: error.message, ephemeral: true });
    }
  },
};
