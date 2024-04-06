const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.ChannelDelete, channel => {
  if (!channel.name.includes("enquiry-")) return;

  const { guild } = channel;

  const role = guild.roles.cache.find(role => role.name === "Busy");

  const channelRoleMember = role.members.find(
    roleMember => channel.permissionsFor(roleMember).serialize().ViewChannel
  );
  
  console.log(`Middleman on channel: ${channelRoleMember?.displayName}`);

  channelRoleMember?.roles.remove(role);
});
