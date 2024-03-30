const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "close",

  button: new ButtonBuilder()
    .setCustomId("close")
    .setLabel("❌ Close")
    .setStyle(ButtonStyle.Danger),
    // .setEmoji("❌"),

  async execute(interaction) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => { });
    // await interaction.deleteReply()

    const { channel } = interaction;

    // const role = guild.roles.cache.find(role => role.name === "Busy")

    // const isSeller = message.embeds[0].description.includes(`${user}`)

    // interaction.reply("The chat will close in 5 seconds.");
    // replyDangerEmbed(interaction, "The chat will close in 5 seconds.", true)
    await sendEmbed(interaction, {
      description: "The Ticket will be closed in 5 seconds!",
      // ephemeral: true,
      // followUp: true
    });

    setTimeout(() => {
      channel.delete();
      // if (member.permissions.has(PermissionsBitField.Flags.Administrator) || isSeller) {
      //   const channelRoleMember = role.members.find(roleMember => channel.permissionsFor(roleMember).serialize().ViewChannel)
      //   // console.log(channelRoleMember);
      //   console.log(`%c Middleman on channel ${channelRoleMember?.displayName}`, 'background: #222; color: #bada55');
      //   channelRoleMember?.roles.remove(role);
      //   channel.delete();
      // }

      // else {
      //   if (member.roles.cache.some(role => role.name === "Busy"))
      //     member.roles.remove(role);
      //   channel.permissionOverwrites.edit(user.id, {
      //     ViewChannel: false,
      //   });
      //   sendEmbed(channel, {
      //     // description: `<@${user.id}> has left the chat.`,
      //     description: `${user} has left the chat.`,
      //   });
      // }
    }, 5000);
  },
};
