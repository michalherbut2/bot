const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219513370311397376/guest3.png?ex=6614cdd4&is=660258d4&hm=4663b8026710c644213e094ef7c2c37d6550d16ff61b7399a76a515f485b4d79&";

const title = "What is Buzz Guest?";

const description = `Buzz Guest is our **FREE** marketplace where every member can dive into the world of buying and selling without any barriers.

Here, sellers can showcase their products, and buyers can browse through a diverse array of listings to find exactly what they're looking for.`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guest")
    .setDescription("create guest")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("upgrade");

    await sendEmbed(channel, {
      title,
      description,
      image,
      row,
    });
  },
};
