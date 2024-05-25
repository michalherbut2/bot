const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const Colors = require("../../utils/colors");

const image = "https://cdn.discordapp.com/attachments/1217520156855635999/1243686666745544806/middleman.png?ex=665260f7&is=66510f77&hm=96b18c4ff416af3688d5ebd159926c8dc64b650e5c34be701c9606ff0715c16e&"

const description = `
# HOW IT WORKS
**MIDDLEMAN PROCESS**

**1.** Active Middleman is invited via button in listing enquiry chat.

**2.** Buyer sends funds to Middleman.

**3.** Seller sends account details to Buyer.

**4.** Buyer confirms successful account transfer.

**5.** Middleman sends funds to the Seller.


**MIDDLEMAN FEES**

**4%** or **4$** for Crypto

**5%** or **5$** for Paypal

**5%** or **5$** for Credit Card`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("middleman")
    .setDescription("create middleman info embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    sendEmbed(channel, {
      description,
      color: Colors.BLUE,
      image,
    });
  },
};
