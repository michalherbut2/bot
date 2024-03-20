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

      if (!middlemanRole) throw new Error("Middleman role not found!");

      // const membersWithRole2 = guild.roles.cache.get(roleID).members;
      console.log("role members:",middlemanRole.members.size);
      
      console.log('\x1b[31m%s\x1b[0m', 'siema');  //red
      // let threadMembers;
      // if (channel.isThread()) threadMembers = await channel.members.fetch();

      const members = await guild.members.fetch();
      console.log("Pobrałem");
      const membersWithRole = members.filter(member =>
        member.roles.cache.has(middlemanRole.id)
      );
      console.log("membersWithRole", membersWithRole.size);
      membersWithRole.map(a => console.log(a.displayName, a?.presence?.status))
      const channelMember = membersWithRole.find(
        member => channel.permissionsFor(member).serialize().ViewChannel
      )

      if (channelMember) {
        console.log(`The middleman ${channelMember.displayName} is already on the channel!`);
        throw new Error(`The middleman ${channelMember.displayName} is already on the channel!`);
      }

      const activeMembersWithRole = membersWithRole.filter(
        member => member.presence
      );

      console.log("activeMembersWithRole",activeMembersWithRole.size);

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

      console.log("freeMembers", freeMembers.size);

      if (freeMembers.size < 1)
        throw new Error("All Middleman are currently busy or there is none active.");

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
      await sendEmbed(interaction, {
        description: `<@${interaction.user.id}> invited middleman <@${randomMember.user.id}> to the chat.`,
      });
      console.log("5");

    } catch (error) {
      console.log("6");

      console.error(error);
      sendEmbed(interaction, { description: error.message, ephemeral: true });
    }
  },
};
