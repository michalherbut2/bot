const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "endChat",

  button: new ButtonBuilder()
    .setCustomId("endChat")
    .setLabel("End Chat")
    .setStyle(ButtonStyle.Danger),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await interaction.deleteReply()

    const { member, channel, user, guild, message } = interaction;

    // get a role
    const role = guild.roles.cache.find(role => role.name === "Busy");

    // check if seller want to end chat
    const description = (await channel.messages.fetch()).find(
      m => m.embeds[0]?.title === "LISTING ENQUIRY"
    )?.embeds[0]?.description;

    const isSeller =
      message.embeds[0].description.includes(user) ||
      description?.includes(user);

    // send embed
    await sendEmbed(interaction, {
      description: "The chat will close in 5 seconds.",
      ephemeral: true,
      followUp: true,
    });

    // end chat after 5 seconds
    setTimeout(() => {
      // if you are admin, delete the channel
      if (
        member.permissions.has(PermissionsBitField.Flags.Administrator) ||
        isSeller
      ) {
        // get middlemans from the channel
        const channelRoleMember = role.members.find(
          roleMember =>
            channel.permissionsFor(roleMember).serialize().ViewChannel
        );

        console.log(`Middleman on channel: ${channelRoleMember?.displayName}`);

        // remove "busy" role from channel members
        channelRoleMember?.roles.remove(role);

        // delete channel
        channel.delete();
      }

      // if you are not admin, leave the channel
      else {
        // if you have "busy" role, remove it
        if (member.roles.cache.some(role => role.name === "Busy"))
          member.roles.remove(role);
        
        // remove access to the channel
        channel.permissionOverwrites.edit(user.id, {
          ViewChannel: false,
        });

        // send info
        sendEmbed(channel, {
          description: `${user} has left the chat.`,
        });
      }
    }, 5000);

    console.log("\x1b[34m%s\x1b[0m", `The chat ENDED.`);
  },
};
