const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");
const Colors = require("../../utils/colors");

const labelName = "ENQUIRE";

module.exports = {
  name: "enquire",

  button: new ButtonBuilder()
    .setCustomId("enquire")
    .setLabel(labelName)
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { message, guild, client, member, user, channel } = interaction;

    // get a name of a social media platform
    const socialPlatformName = channel.parent.name.split("︱")[1];

    let description = message.embeds[0].description;

    const color = message.embeds[0].color;

    // get a user id from embed
    const regex = /<@!?(\d+)>/;
    const match = description.match(regex);

    const targetUserId = match[1];

    const targetMember = await guild.members.fetch(targetUserId);

    description = description.split("\n\n").slice(1, -1).join("\n\n");

    // get the channel
    const categoryName = `enquires - ${socialPlatformName}`;
    const targetCategory = guild.channels.cache.find(
      channel => channel.name.toLowerCase() === categoryName
    );

    try {
      if (!targetCategory)
        throw new Error(`I cannot create the ${categoryName} channel.
There is no **${categoryName}** category on the server!`);

      // get a target channel
      const channelName = `enquiry-${user.tag}`;
      let targetChannel = targetCategory?.children?.cache.find(
        channel => channel.name === channelName
      );

      // get images
      const mess = await channel.messages.fetch();
      const files = [mess.last().attachments.first()];
      // console.log("images:", image);

      // check if the enquiry exists
      if (targetChannel)
        return await sendEmbed(interaction, {
          description: `**You already have a ${labelName} ${targetChannel} in progress.**

Please wait until your previous ${labelName} is finalised!`,
          ephemeral: true,
          color: Colors.RED,
          followUp: true,
        });
      // create channel
      else
        targetChannel = await guild.channels.create({
          name: channelName,
          parent: targetCategory.id,

          // access only for bot and buyer (send mess only in threads)
          permissionOverwrites: [
            // send mess only in thread
            {
              id: client.user, // bot
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
            {
              id: user, // buyer
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessagesInThreads,
                PermissionsBitField.Flags.AttachFiles,
              ],
            },
            {
              id: guild.id, // everyone
              deny: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
          ],
        });

      // create button
      const row = createRow("endChat");

      // send embed to the target channel
      await sendEmbed(targetChannel, {
        description: `Please wait for the **SELLER** ${targetMember} to accept the invite!`,
        row,
      });

      // send embeds to the seller
      await targetMember.user.send({ files });

      description = `${member} is interested in the listing.\n\n${description}\n\n*Use the buttons below to **ACCEPT** or **DECLINE** the chat with ${member} on ${targetChannel} channel from ${guild} server.*`;

      const dmRow = createRow("accept", "decline");

      await sendEmbed(targetMember.user, { description, row: dmRow, color });

      // reply
      await sendEmbed(interaction, {
        description: `The **Seller** ${targetMember} has been notified.

Make your way to the **${targetChannel}** channel.`,
        ephemeral: true,
        followUp: true,
        color,
      });

      console.error("\x1b[34m%s\x1b[0m", `ENQUIRE created for ${user.tag}`);
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        followUp: true,
        color: Colors.RED,
      });
    }
  },
};
