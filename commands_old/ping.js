const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns websocket latency"),

  async run(client, interaction) {
    // const embed = new EmbedBuilder()
    //   .setColor("#FF0000")
    //   .setTitle("🏓 Pong!")
    //   .setDescription(`Latency : ${client.ws.ping}ms`)
    //   .setTimestamp()
    //   .setFooter({
    //     text: `Requested by ${interaction.user.tag}`,
    //     iconURL: `${interaction.user.displayAvatarURL()}`,
    //   });
    // interaction.followUp({ embeds: [embed] });
    sendEmbed(interaction, {
      title: "🏓 Pong!",
      description: `Latency : ${client.ws.ping}ms`,
      color: 0xff0000,
    });
  },
};
