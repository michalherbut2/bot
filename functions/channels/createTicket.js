const { PermissionsBitField } = require("discord.js");
const sendEmbed = require("../messages/sendEmbed");
const createRow = require("../messages/createRow");

// embed content
const thumbnail =
  "https://media.discordapp.net/attachments/1216104890976305162/1216201330549456926/Logoonew.png?ex=6611fbc1&is=65ff86c1&hm=50ceb9b9c349f96013743bd5bb672e231bbad5e233123921185bf65e8b516e45&format=webp&quality=lossless&width=625&height=625&";

const title = "Support Ticket";

const footerText = "🎟️ Viral Buzz BETA Support";

const description = `__Please wait until one of our staff will come and assist you__

If you have made a purchase please send all the necessary information below for us to handle your ticket quicker!

For any other enquires please wait`;

module.exports = async (interaction, labelName) => {
  try {
    await interaction.deferReply({ ephemeral: true });

    // get a data
    const { guild, user, client } = interaction;

    // get a category
    const targetCategory = guild.channels.cache.find(
      channel => channel.name === labelName
    );

    if (!targetCategory)
      throw new Error(`I cannot create the ticket channel.
There is no **${labelName}** category on the server!`);
    
    // get a channel
    const channelName = `🎟┃ticket-${user.tag}`;
    let targetChannel = targetCategory?.children?.cache.find(
      channel => channel.name === channelName
    );

    if (targetChannel)
      return await sendEmbed(interaction, {
        description: `**You already have a ${labelName} ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`,
        ephemeral: true,
        color: "red",
        followUp: true,
      });
    // create the channel
    else
      targetChannel = await guild.channels.create({
        name: channelName,
        parent: targetCategory.id,
        permissionOverwrites: [
          // access only for the admins, bot and author
          {
            id: client.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: guild.id,
            deny: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });

    console.log("\x1b[32m%s\x1b[0m", `CREATED ${labelName} ${targetChannel.name}`);

    const row = createRow("close");

    // send embed
    await sendEmbed(targetChannel, {
      title,
      description,
      thumbnail,
      footerText,
      row,
    });

    // reply
    await sendEmbed(interaction, {
      description: `Your submission was received successfully!

**MAKE YOUR WAY TO THE ${targetChannel}**`,
      followUp: true,
    });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", error);

    sendEmbed(interaction, {
      description: error.message,
      color: "red",
      followUp: true,
    });
  }
};
