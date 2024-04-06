const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "accept",

  button: new ButtonBuilder()
    .setCustomId("accept")
    .setLabel("Accept")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const { message, client, user } = interaction;

    let description = message.embeds[0].description;

    // finding channel id in embed
    const channelRegex = /<#(\d+)>/;
    const channelMatch = description.match(channelRegex);
    // console.log(match);

    const targetChannelId = channelMatch[1];
    // console.log(message.mentions);
    console.log("channelId::::::", targetChannelId);

    const guild = client.guilds.cache.find(guild =>
      guild.channels.cache.find(c => c.id === targetChannelId)
    );

    try {
      if (!guild)
        throw new Error("The enquiry has expired! Create a new enquiry.");

      const targetChannel = await guild.channels.fetch(targetChannelId);

      // finding user id in embed
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

      // reply
      description = `** Seller **: \n${user} \n\n${description
        .split("\n\n")
        .slice(1, -1)
        .join("\n\n")}`;

      const replyDescription = `You have **ACCEPTED** the invite from ${targetUser},

Please make your way to the ${targetChannel} channel.`;

      await message.delete();

      sendEmbed(interaction, {
        description: replyDescription,
        color: 0x3ff204,
      });

      // send enquiry embeds
      await targetChannel.messages.cache.first().delete();

      await sendEmbed(targetChannel, {
        description:
          "The Seller has **ACCEPTED** the invite, he should be here shortly.",
        color: 0x41fd02,
      });

      await sendEmbed(targetChannel, {
        title: "LISTING ENQUIRY",
        description,
        image:
          "https://cdn.discordapp.com/attachments/1218001649847763045/1218008310058586252/asdasd333.png?ex=66188ea2&is=660619a2&hm=ec27e344dba85cf2fc61c887fa91b927af5d2e487e0f7ef53aa39cb4439f5d38&",
      });

      const thread = await targetChannel.threads.create({
        name: "ENTER CHAT",
        invitable: false,
      });

      const row = createRow("endChat", "report", "middleman");

      sendEmbed(targetChannel, {
        title: "OPTIONS",
        description: "Choose what you want to do next.",
        image:
          "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&",
        row,
      });

      // add members to the thread
      thread.join();

      thread.members.add(targetUser);

      thread.members.add(user);
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      await message.delete();

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        color: "red",
      });
    }
  },
};
