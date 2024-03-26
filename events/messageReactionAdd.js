const { Events, PermissionsBitField } = require("discord.js");
const client = require("../index");
const createRow = require("../functions/messages/createRow");
const sendEmbed = require("../functions/messages/sendEmbed");

client.on(Events.MessageReactionAdd, (messageReaction, user) => {
  // console.log(user);
  if (user.bot) return;
  
  if (messageReaction.message.channel.name !== "ADD IMAGES") return;
  // console.log(messageReaction.message.guild.members.cacher);
  if (
    !messageReaction.message.guild.members.cache
      .get(user.id)
      .permissions.has(PermissionsBitField.Flags.BanMembers)
  )
    return;
  if (messageReaction.emoji.name === "❌") messageReaction.message.delete();
});
