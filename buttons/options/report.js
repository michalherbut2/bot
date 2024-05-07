const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const Colors = require("../../utils/colors");

module.exports = {
  name: "report",
  button: new ButtonBuilder()
    .setCustomId("report")
    .setLabel("Report")
    .setStyle(ButtonStyle.Danger),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel, guild, client } = interaction;

    // get thread messages
    const threads = await channel.threads.fetch();

    const threadMessages = await threads.threads
      .find(thread => thread.name === "ENTER CHAT")
      .messages.fetch();

    // create content
    let allMessages = "";

    threadMessages.reverse().forEach(message => {
      if (message.content)
        allMessages += `**${message.author.tag}**: ${message.content}\n`;
    });

    if (!allMessages)
      return await sendEmbed(interaction, {
        description: "There are no messages to report!",
        ephemeral: true,
        followUp: true,
        color: Colors.RED,
      });

    // find category
    const targetCategory = guild.channels.cache.find(
      channel => channel.name === "ENQUIRIES - REPORTS"
    );

    if (!targetCategory)
      throw new Error(`I cannot create the report channel.
There is no **${labelName}** category on the server!`);

    // find channel
    const channelName = `report-${channel.name}`;
    let targetChannel = targetCategory?.children?.cache.find(
      channel => channel.name === channelName
    );

    // create channel
    if (!targetChannel)
      targetChannel = await guild.channels.create({
        name: `report-${channel.name}`,
        // parent: "1218724264946172025", // buzz
        parent: targetCategory.id, // test

        permissionOverwrites: [
          // Zablokuj dostęp dla wszystkich poza rolą administratora
          {
            id: client.user.id,
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

    // send report
    sendEmbed(targetChannel, {
      title: `Report from ${channel}`,
      description: allMessages,
    });

    // send notification
    sendEmbed(channel, {
      description: `${interaction.user} has reported the chat.`,
      color: Colors.RED,
    });

    console.log(
      "\x1b[34m%s\x1b[0m",
      `${interaction.user.tag} has reported the chat.`
    );
  },
};
