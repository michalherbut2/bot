const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const labelName = "ENQUIRE";

module.exports = {
  name: "enquire",

  button: new ButtonBuilder()
    .setCustomId("enquire")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { message, guild, client, member, user } = interaction;
    let description = message.embeds[0].description;

    // finding user id in embed
    const regex = /<@!?(\d+)>/;
    const match = description.match(regex);

    const targetUserId = match[1];

    const targetMember = await guild.members.fetch(targetUserId);

    description = description.split("\n\n").slice(1).join("\n\n");

    // find the channel
    const categoryName = "enquires - tiktok";
    const targetCategory = guild.channels.cache.find(
      channel => channel.name.toLowerCase() === categoryName
    );

    try {
      if (!targetCategory)
        throw new Error(`I cannot create the ${labelName} channel.
There is no **${categoryName}** category on the server!`);

      const channelName = `enquiry-${user.tag}`;
      let targetChannel = targetCategory?.children?.cache.find(
        channel => channel.name === channelName
      );

      // create channel
      if (targetChannel)
        return await sendEmbed(interaction, {
          description: `**You already have a ${labelName} ${targetChannel} in progress.**

Please wait until your previous ${labelName} is finalised!`,
          ephemeral: true,
          color: "red",
          followUp: true,
        });
      else
        targetChannel = await guild.channels.create({
          name: channelName,
          parent: targetCategory.id,
          // access only for bot and buyer (send mess only in threads)
          permissionOverwrites: [
            // send mess only in thread
            // bot
            {
              id: client.user,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
            // buyer
            {
              id: user,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessagesInThreads,
                PermissionsBitField.Flags.AttachFiles,
              ],
            },
            // everyone
            {
              id: guild.id,
              deny: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
          ],
        });

      description = `${member} is interested in the listing.\n\n${description}\n\n*Use the buttons below to **ACCEPT** or **DECLINE** the chat with ${member} on ${targetChannel} channel from ${guild} server.*`;

      const row = createRow("endChat");

      // send embed in the target channel
      await sendEmbed(targetChannel, {
        description: `Please wait for the **SELLER** ${targetMember} to accept the invite!`,
        row,
      });

      const dmRow = createRow("accept", "decline");

      await sendEmbed(targetMember.user, { description, row: dmRow });

      // reply
      await sendEmbed(interaction, {
        description: `The **Seller** ${targetMember} has been notified.

Make your way to the **${targetChannel}** channel.`,
        ephemeral: true,
        followUp: true,
      });

      console.error("\x1b[34m%s\x1b[0m", `ENQUIRE created for ${user.tag}`);
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        followUp: true,
      });
    }
  },
};
