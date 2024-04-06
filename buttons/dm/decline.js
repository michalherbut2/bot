const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "decline",

  button: new ButtonBuilder()
    .setCustomId("decline")
    .setLabel("Decline")
    .setStyle(ButtonStyle.Danger),

  async execute(interaction) {
    // sendEmbed(interaction, { description, ephemeral: true });

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
      if (!guild) throw new Error("The enquiry has expired! Create a new enquiry.");

      const targetChannel = await guild.channels.fetch(targetChannelId);

      // finding user id in embed
      const userRegex = /<@!?(\d+)>/;
      const userMatch = description.match(userRegex);

      const targetUserlId = userMatch[1];

      const targetUser = await guild.members.fetch(targetUserlId);
      
      // description = description.split("\n\n").slice(1, -1).join("\n\n");
      description = `** Seller **: \n${user} \n\n${description
        .split("\n\n")
        .slice(1, -1)
        .join("\n\n")}`;

      const replyDescription = `You have **DECLINED** the invite from ${targetUser}!`;

      // interaction.reply(description);

      const waitMessage = await targetChannel.messages.fetch();
      await waitMessage.first().delete();

      await message.delete();

      await sendEmbed(targetChannel, {
        title: "LISTING ENQUIRY",
        description,
        image:
          "https://media.discordapp.net/attachments/888756864748228681/1216536461789102142/asdasd.png?ex=661333de&is=6600bede&hm=104f8aa6169a560628596e6abd1593ea5913b921c5425304b77b6ca3f4a7fa0c&format=webp&quality=lossless&width=1440&height=311&",
      });

      const row = createRow("endChat");

      await sendEmbed(targetChannel, {
        description:
          "The seller has **DECLINED** the invite, please end the chat.",
        color: "red",
        row,
      });

      sendEmbed(interaction, { description: replyDescription, color: "red" });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      await message.delete()

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        color: "red"
      });
    }
  },
};
