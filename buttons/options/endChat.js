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

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await interaction.deleteReply()

    const { member, channel, user, guild, message } = interaction;

    const role = guild.roles.cache.find(role => role.name === "Busy");

    const description = (await channel.messages.fetch()).find(
      m => m.embeds[0]?.title === "LISTING ENQUIRY"
    )?.embeds[0]?.description;

    const isSeller =
      message.embeds[0].description.includes(user) ||
      description?.includes(user);

    await sendEmbed(interaction, {
      description: "The chat will close in 5 seconds.",
      ephemeral: true,
      followUp: true,
    });

    setTimeout(() => {
      if (
        member.permissions.has(PermissionsBitField.Flags.Administrator) ||
        isSeller
      ) {
        const channelRoleMember = role.members.find(
          roleMember =>
            channel.permissionsFor(roleMember).serialize().ViewChannel
        );

        console.log(`Middleman on channel: ${channelRoleMember?.displayName}`);

        channelRoleMember?.roles.remove(role);
        channel.delete();
      } else {
        if (member.roles.cache.some(role => role.name === "Busy"))
          member.roles.remove(role);
        channel.permissionOverwrites.edit(user.id, {
          ViewChannel: false,
        });
        sendEmbed(channel, {
          description: `${user} has left the chat.`,
        });
      }
    }, 5000);

    console.log("\x1b[34m%s\x1b[0m", `The chat ENDED.`);
  },
};
