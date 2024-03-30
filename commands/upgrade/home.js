const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219514152293498910/home.png?ex=6614ce8f&is=6602598f&hm=d2ecfa6cca9f770dc3474deb51c5cd9a5e3f8b0e5cd0007d4a29c0d4803adf77&";

const title = "What is Buzz Home?";

const description = `Tired of browsing through endless listings? Ensure what you're seeing is easily **accessible, filtered and organised**.

Say goodbye to uncertainty and buzz with a **seamless shopping experience**.

The **ultimate marketplace** for both buyers and sellers looking to get straight to the point.`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("home")
    .setDescription("create home")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("sellers", "buyers", "ourPlans");

    sendEmbed(channel, {
      title,
      description,
      image,
      row,
    });
  },
};
