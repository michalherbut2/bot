const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const addRole = require("../../functions/roles/addRole");
const Colors = require("../../utils/colors");

module.exports = {
  name: "middleman",

  button: new ButtonBuilder()
    .setCustomId("middleman")
    .setLabel("Middleman")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    await interaction.deleteReply();

    const { channel, guild, message } = interaction;

    const color = message.embeds[0].color;

    // fetch members and roles
    await guild.members.fetch();
    const roles = await guild.roles.fetch();

    // get the middleman role
    const middlemanRole = roles.find(role => role.name === "Middleman");

    try {
      if (!middlemanRole) throw new Error("Middleman role not found!");

      console.log("Middleman role members:", middlemanRole.members.size);

      const roleMembers = middlemanRole.members;

      roleMembers.map(a => console.log(a.displayName, a?.presence?.status));

      // get the middlemans with access to the channel
      const channelMember = roleMembers.find(
        member => channel.permissionsFor(member).serialize().ViewChannel
      );

      // check if any middleman is already on the channel
      if (channelMember) {
        console.log(
          `The middleman ${channelMember.tag} is already on the channel!`
        );

        throw new Error(
          `The middleman ${channelMember} is already on the channel!`
        );
      }

      // get online middlemans
      const activeRoleMembers = roleMembers.filter(
        member =>
          member?.presence?.status && member?.presence?.status !== "offline"
      );

      console.log("activeRoleMembers", activeRoleMembers.size);

      // get free online middlemans 
      const freeMembers = activeRoleMembers.filter(
        member => !member.roles.cache.find(role => role.name === "Busy")
      );

      console.log("freeMembers:", freeMembers.size);

      // chcek if there is any free middleman
      if (freeMembers.size < 1)
        throw new Error(
          "All Middleman are currently busy or there is none active."
        );

      // get random free online middleman
      const randomMember = freeMembers.random();

      await addRole(channel, randomMember.id, "Busy");

      channel.permissionOverwrites.edit(randomMember.id, {
        ViewChannel: true,
      });

      console.log("random middleman:", randomMember.displayName);

      // send info
      await sendEmbed(channel, {
        description: `${interaction.user} invited middleman ${randomMember} to the chat.`,
        color,
      });

      // add middleman to the thread
      const threads = await channel.threads.fetch();

      const thread = threads.threads.find(
        thread => thread.name === "ENTER CHAT"
      );

      thread.members.add(randomMember);

      console.log(
        "\x1b[34m%s\x1b[0m",
        `${interaction.user.tag} invited middleman ${randomMember.user.tag} to the chat.`
      );
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(channel, {
        description: error.message,
        ephemeral: true,
        color: Colors.RED,
      });
    }
  },
};
