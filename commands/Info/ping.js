const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns websocket latency"),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`Latency : ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL()}`,
      });
    interaction.followUp({ embeds: [embed] });
    sendEmbed(
      interaction.channel,
      "LISTING ENQUIRY",
      "description @miszalek2",
      "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&"
    );
  },
};
