const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const title = "MIDDLEMAN";

// const image =

const description = `**MIDDLEMAN PROCESS**

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
      title,
      description,
      // image,
    });
  },
};
