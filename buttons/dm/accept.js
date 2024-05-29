const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");
const Colors = require("../../utils/colors");

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

module.exports = {
  name: "accept",

  button: new ButtonBuilder()
    .setCustomId("accept")
    .setLabel("Accept")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { message, channel, client, user } = interaction;

    // get description
    let description = message.embeds[0].description;

    // get channel id from embed
    const channelRegex = /<#(\d+)>/;
    const channelMatch = description.match(channelRegex);

    const targetChannelId = channelMatch[1];

    // get guild
    const guild = client.guilds.cache.find(guild =>
      guild.channels.cache.find(c => c.id === targetChannelId)
    );

    // get the previous message with the image from DM
    const channelMessages = await channel.messages.fetch({
      limit: 1,
      before: message.id,
    });
    const imageMessage = channelMessages.first();

    try {
      if (!guild)
        throw new Error("The enquiry has expired! Create a new enquiry.");
      console.log(imageMessage.attachments);
      const files = [imageMessage.attachments.first()]
      // const files = [attachment.url];

      if (!files)
        throw new Error("No image found in the previous message.");

      // get target channel
      const targetChannel = await guild.channels.fetch(targetChannelId);

      // get the name of the social media platform
      const socialPlatformName = targetChannel.parent.name
        .toLowerCase()
        .split(" - ")[1];

      // get the color of the social media platform
      const color = socialPlatformName;

      // get user id from embed
      const userRegex = /<@!?(\d+)>/;
      const userMatch = description.match(userRegex);

      const targetUserlId = userMatch[1];

      const targetUser = await guild.members.fetch(targetUserlId);

      // add permission
      await targetChannel.permissionOverwrites.create(user, {
        ViewChannel: true,
        SendMessagesInThreads: true,
        AttachFiles: true,
      });

      // send enquiry embeds
      const targetChannelMessages = await targetChannel.messages.fetch();
      await targetChannelMessages.first().delete();

      await sendEmbed(targetChannel, {
        description:
          "The Seller has **ACCEPTED** the invite, he should be here shortly.",
        color: Colors.INTENSE_GREEN,
      });

      await targetChannel.send({ files });

      await sendEmbed(targetChannel, {
        title: "LISTING ENQUIRY",
        description,
        image: images[socialPlatformName].details,
        color,
      });

      const thread = await targetChannel.threads.create({
        name: "ENTER CHAT",
        invitable: false,
      });

      const row = createRow("endChat", "report", "middleman");

      sendEmbed(targetChannel, {
        title: "OPTIONS",
        description: "Choose what you want to do next.",
        image: images[socialPlatformName].options,
        row,
        color,
      });

      // add members to the thread
      thread.join();

      thread.members.add(targetUser);

      thread.members.add(user);

      // reply
      description = `** Seller **: \n${user} \n\n${description
        .split("\n\n")
        .slice(1, -1)
        .join("\n\n")}`;

      const replyDescription = `You have **ACCEPTED** the invite from ${targetUser},

Please make your way to the ${targetChannel} channel.`;

      // delete previous messages from dm
      await imageMessage.delete();
      await message.delete();

      // send dm
      sendEmbed(channel, {
        description: replyDescription,
        color: Colors.INTENSE_GREEN,
      });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);
      
      await imageMessage?.delete();
      await message.delete();

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        color: Colors.RED,
        followUp: true,
      });
    }
  },
};
