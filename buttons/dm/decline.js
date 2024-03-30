const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "decline",

  button: new ButtonBuilder()
    .setCustomId("decline")
    .setLabel("Decline")
    .setStyle(ButtonStyle.Danger),

  async execute(interaction) {
    // sendEmbed(interaction, { description, ephemeral: true });

    const { message, client } = interaction;

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

    const targetChannel = await guild.channels.fetch(targetChannelId);

    // finding user id in embed
    const userRegex = /<@!?(\d+)>/;
    const userMatch = description.match(userRegex);

    const targetUserlId = userMatch[1];

    const targetUser = await guild.members.fetch(targetUserlId);

    description = description.split("\n\n").slice(1, -1).join("\n\n");

    const replyDescription = `You have DECLINED the invite from ${targetUser}!`;

    // interaction.reply(description);

    await message.delete();
    await targetChannel.messages.cache.first().delete()

    await sendEmbed(targetChannel, {
      title: "LISTING ENQUIRY",
      description,
      image:
        "https://media.discordapp.net/attachments/888756864748228681/1216536461789102142/asdasd.png?ex=661333de&is=6600bede&hm=104f8aa6169a560628596e6abd1593ea5913b921c5425304b77b6ca3f4a7fa0c&format=webp&quality=lossless&width=1440&height=311&",
    });

    await sendEmbed(targetChannel, {
      description:
        "The seller has **DECLINED** the invite, please end the chat.",
      color: "red",
    });

    sendEmbed(interaction, { description: replyDescription, color: "red" });
  },
};
