const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.ChannelDelete, channel => {
  // stop if channel name do not includes "enquiry-"
  if (!channel.name.includes("enquiry-")) return;

  // get the "busy" role
  const role = channel.guild.roles.cache.find(
    role => role.name.toLowerCase() === "busy"
  );

  // get role member with access to the deteted channel
  const channelRoleMember = role.members.find(
    roleMember => channel.permissionsFor(roleMember).serialize().ViewChannel
  );

  console.log(`Middleman on channel: ${channelRoleMember?.displayName}`);

  // remove the role from the member
  channelRoleMember?.roles.remove(role);
});
