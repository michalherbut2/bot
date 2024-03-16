const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

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

    if (!reportChannel)
      reportChannel = await guild.channels.create({
        name: `report-${channel.name}`,
        permissionOverwrites: [
          // Zablokuj dostęp dla wszystkich poza rolą administratora
          {
            id: "883718029219885086",
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          // {
          //   id: adminRole.id,
          //   allow: [Permissions.FLAGS.VIEW_CHANNEL],
          // },
        ],
      });

    // Wyślij całą konwersację do kanału zgłoszeń
    sendEmbed(reportChannel, `Report from ${channel}`, allMessages);

    // Odpowiedz użytkownikowi, że zgłoszenie zostało przyjęte
    interaction.reply(
      "The chat has been reported and saved for the administration."
    );
  },
};
