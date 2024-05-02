const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

// embed content
const images = {
  tiktok: {
    details:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227695306364424324/tt-1.png?ex=6629575a&is=6616e25a&hm=57dfb918d8508c163aae3904a5f08aa5aa9596b8318e6cbef524de52c4a85928&",
    options:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227695329047220244/tt-2.png?ex=6629575f&is=6616e25f&hm=52061b1cd5b936df0c73f10370c1b72d41484a962fff30b41bcd3c144db529a2&",
  },
  youtube: {
    details:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227688157026324520/yt-2.png?ex=662950b1&is=6616dbb1&hm=ae12c384b3474eab02e13016d5e43d0571c188a6783c8d2cbd2c08f71334a66c&",
    options:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227689699364175893/yt-6.png?ex=66295221&is=6616dd21&hm=6cb2305b1a0a08246c5631216111f746d563a982b210e507694cf4456a3c0f38&",
  },
  instagram: {
    details:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227698889570648166/insta-enquiry.png?ex=66295ab0&is=6616e5b0&hm=6ed6c3941168cefcbed47d3afe847118eb9f37e98e523dca65e4f2bda08b7bfa&",
    options:
      "https://cdn.discordapp.com/attachments/1217520156855635999/1227698943996203008/insta-options.png?ex=66295abd&is=6616e5bd&hm=35dcdc6d18c194b7a5ba8d5c002b8988d7a9991fd48d65d4c72fdaada283046e&",
  },
};

const colors = {
  tiktok: 0x00f2ea,
  youtube: 0xdd2c28,
  instagram: 0x794eba,
};

module.exports = {
  name: "decline",

  button: new ButtonBuilder()
    .setCustomId("decline")
    .setLabel("Decline")
    .setStyle(ButtonStyle.Danger),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { message, channel, client, user } = interaction;

    let description = message.embeds[0].description;

    // get a channel id from embed
    const channelRegex = /<#(\d+)>/;
    const channelMatch = description.match(channelRegex);

    const targetChannelId = channelMatch[1];

    // get a guild
    const guild = client.guilds.cache.find(guild =>
      guild.channels.cache.find(c => c.id === targetChannelId)
    );
    
    try {
      if (!guild)
        throw new Error("The enquiry has expired! Create a new enquiry.");

      // get target channel
      const targetChannel = await guild.channels.fetch(targetChannelId);

      // get the name of the social media platform 
      const socialPlatformName = targetChannel.parent.name
        .toLowerCase()
        .split(" - ")[1];

      // get the color of the social media platform 
      const color = colors[socialPlatformName];

      // get images from dm
      const channelMessages = await channel.messages.fetch({
        limit: 1,
        before: message.id,
      });

      const imageMessage = channelMessages.first();

      // get user id from embed
      const userRegex = /<@!?(\d+)>/;
      const userMatch = description.match(userRegex);

      const targetUserlId = userMatch[1];

      const targetUser = await guild.members.fetch(targetUserlId);

      // prepare descriptions
      description = `** Seller **: \n${user} \n\n${description
        .split("\n\n")
        .slice(1, -1)
        .join("\n\n")}`;

      const replyDescription = `You have **DECLINED** the invite from ${targetUser}!`;

      // delete target cahnnel waiting message
      const waitMessage = await targetChannel.messages.fetch();
      await waitMessage.first().delete();

      // delete dm messages
      await imageMessage.delete();
      await message.delete();

      // send enquiry embeds
      await sendEmbed(targetChannel, {
        title: "LISTING ENQUIRY",
        description,
        image: images[socialPlatformName].details,
        color,
      });

      const row = createRow("endChat");

      await sendEmbed(targetChannel, {
        description:
          "The seller has **DECLINED** the invite, please end the chat.",
        color: "red",
        row,
      });

      // send dm
      sendEmbed(channel, { description: replyDescription, color: "red" });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      await message.delete();

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        color: "red",
        followUp: true,
      });
    }
  },
};
