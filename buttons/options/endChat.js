const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const replyEmbed = require("../../functions/messages/replyEmbed");
const replyDangerEmbed = require("../../functions/messages/replyDangerEmbed");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "endChat",

  button: new ButtonBuilder()
    .setCustomId("endChat")
    .setLabel("End Chat")
    .setStyle(ButtonStyle.Danger),

  async execute(interaction) {
    const { member, channel, user, guild } = interaction;
    
    const role = guild.roles.cache.find(role => role.name === "Busy")

    // interaction.reply("The chat will close in 5 seconds.");
    // replyDangerEmbed(interaction, "The chat will close in 5 seconds.", true)
    sendEmbed(interaction, {
      description: "The chat will close in 5 seconds.",
      ephemeral: true,
    });

    setTimeout(() => {
      if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        const channelRoleMember = role.members.find(roleMember => channel.permissionsFor(roleMember).serialize().ViewChannel)
        console.log(channelRoleMember);
        channelRoleMember && channelRoleMember.roles.remove(role);
        channel.delete();
      }

      else {
        if (member.roles.cache.some(role => role.name === "Busy"))
          member.roles.remove(role);
        channel.permissionOverwrites.edit(user.id, {
          ViewChannel: false,
        });
        sendEmbed(channel, {
          description: `<@${user.id}> has left the chat.`,
        });
      }
    }, 5000);
  },
};
