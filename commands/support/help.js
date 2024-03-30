const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const thumbnail = "https://media.discordapp.net/attachments/1216104890976305162/1216201330549456926/Logoonew.png?ex=6611fbc1&is=65ff86c1&hm=50ceb9b9c349f96013743bd5bb672e231bbad5e233123921185bf65e8b516e45&format=webp&quality=lossless&width=625&height=625&"

const title = "Viral Buzz Support";

const footerText = "🎟️ Viral Buzz Support"

const description = `__Welcome to this support panel!__

Click on the button below if you wish to talk to the support team. They will respond to your request`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("create help")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("generalHelp", "buzzGuard", "buzzHome");

    await sendEmbed(channel, {
      title,
      description,
      thumbnail,
      footerText,
      row,
    });
  },
};
