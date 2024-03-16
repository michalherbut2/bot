const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "middleman",

  button: new ButtonBuilder()
    .setCustomId("middleman")
    .setLabel("Middleman")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const { channel, guild } = interaction;
    const middlemanRole = guild.roles.cache.find(role => role.name === "test");

    if (!middlemanRole) return interaction.reply("Middleman role not found!");

    let threadMembers;
    if (channel.isThread()) threadMembers = await channel.members.fetch();
    
    const members = await guild.members.fetch()
    const membersWithRole = members.filter(member => member.roles.cache.has(middlemanRole.id))
    const activeMembersWithRole = membersWithRole.filter(member => member.presence) 
    
    activeMembersWithRole.forEach(a => console.log(a.user.username));
    const newMembers = activeMembersWithRole.filter(a =>
      channel.isThread()
        ? !threadMembers.find(m => m.id === a.id)
        : !channel.permissionsFor(a).serialize().ViewChannel
    );

    if (newMembers.size < 1)
      return interaction.reply(
        "There are no active users with the middleman role!"
      );

    const randomMember = newMembers.random();

    if (channel.isThread()) channel.members.add(randomMember);
    else
      channel.permissionOverwrites.edit(randomMember.user.id, {
        ViewChannel: true,
      });
    
    interaction.reply(
      "One of the active middleman has been invited to the chat: " +
        randomMember.user.username
    );
  },
};
