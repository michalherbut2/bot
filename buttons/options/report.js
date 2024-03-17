const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const replyDangerEmbed = require("../../functions/messages/replyDangerEmbed");

module.exports = {
  
  name: "report",
  button: new ButtonBuilder()
    .setCustomId("report")
    .setLabel("Report")
    .setStyle(ButtonStyle.Danger),
  
  async execute(interaction) {
  
    const { channel, guild } = interaction;
    
    // Pobierz całą konwersację z bieżącego kanału
    const messages = await channel.messages.fetch();
    let allMessages = "";
    messages.reverse().forEach(message => {
      if (message.content)
        allMessages += `**${message.author.tag}**: ${message.content}\n`;
    });
    
    const channelName = `report-${channel.name}`;
    let reportChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );
    
    // #########
    // TODO find category by name
    // #########
    
    let reportCategory = guild.channels.cache.find(
      channel => channel.name === "ENQUIRIES - REPORTS"
    );

    if (!reportChannel)
      reportChannel = await guild.channels.create({
        name: `report-${channel.name}`,
        // parent: "1218724264946172025", // buzz
        parent: reportCategory.id, // test

        permissionOverwrites: [
          // Zablokuj dostęp dla wszystkich poza rolą administratora
          {
            id: "883718029219885086",
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: "883718029219885086",
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
    sendEmbed(reportChannel, {title: `Report from ${channel}`, description: allMessages});

    // Odpowiedz użytkownikowi, że zgłoszenie zostało przyjęte
    // interaction.reply(
    // replyDangerEmbed(interaction, `<@${interaction.user.id}> has reported the chat.`)
    sendEmbed(interaction, {description: `<@${interaction.user.id}> has reported the chat.`, color: "red"})
  },
};
 