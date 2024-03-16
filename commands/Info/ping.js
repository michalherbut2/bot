const { EmbedBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "ping",
  description: "Returns websocket latency",

  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`Latency : ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
    sendEmbed(interaction.channel, "LISTING ENQUIRY", "description @miszalek2", "/run/media/d/home/michal/Obrazy/Jura-logos/jura_banner_subtitle.png");
  },
};
