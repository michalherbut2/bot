const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const client = require("../..");

module.exports = {
  name: "report",
  button: new ButtonBuilder()
    .setCustomId("report")
    .setLabel("Report")
    .setStyle(ButtonStyle.Danger),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    await interaction.deleteReply();

    const { channel, guild, client } = interaction;

    // Pobierz całą konwersację z bieżącego kanału
    // const threadMessages = await channel.threads.fetch()
    // console.log(threadMessages);
    const threadMessages = await (await channel.threads.fetch()).threads
      .find(thread => thread.name === "ENTER CHAT")
      .messages.fetch();
    // const threadsMessages = threads.map(async thread => await thread.messages.fetch())
    // const messages = await channel.messages.fetch();
    let allMessages = "";
    // messages.reverse().forEach(message => {
    threadMessages.reverse().forEach(message => {
      if (message.content)
        allMessages += `**${message.author.tag}**: ${message.content}\n`;
    });

    if (!allMessages)
      return await sendEmbed(interaction, {
        description: "There are no messages to report!",
        ephemeral: true,
        // followUp: true,
        color: "red",
      });

    const targetCategory = guild.channels.cache.find(
      channel => channel.name === "ENQUIRIES - REPORTS"
    );

    if (!targetCategory)
      throw new Error(`I cannot create the report channel.
There is no **${labelName}** category on the server!`);

    const channelName = `report-${channel.name}`;
    let targetChannel = targetCategory?.children?.cache.find(
      channel => channel.name === channelName
    );


    if (!targetChannel)
      targetChannel = await guild.channels.create({
        name: `report-${channel.name}`,
        // parent: "1218724264946172025", // buzz
        parent: targetCategory.id, // test

        permissionOverwrites: [
          // Zablokuj dostęp dla wszystkich poza rolą administratora
          {
            id: client.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: client.id,
            allow: [PermissionsBitField.Flags.SendMessages],
          },
          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          // {
          //   id: "883718029219885086",
          //   allow: [PermissionsBitField.Flags.SendMessages],
          // },
          // {
          //   id: adminRole.id,
          //   allow: [Permissions.FLAGS.VIEW_CHANNEL],
          // },
        ],
      });

    // Wyślij całą konwersację do kanału zgłoszeń
    sendEmbed(targetChannel, {
      title: `Report from ${channel}`,
      description: allMessages,
    });

    // Odpowiedz użytkownikowi, że zgłoszenie zostało przyjęte
    // interaction.reply(
    // replyDangerEmbed(interaction, `<@${interaction.user.id}> has reported the chat.`)
    sendEmbed(channel, {
      // description: `<@${interaction.user.id}> has reported the chat.`,
      description: `${interaction.user} has reported the chat.`,
      color: "red",
    });
    console.log(`${interaction.user.tag} has reported the chat.`);
    // console.log(allMessages);
  },
};
